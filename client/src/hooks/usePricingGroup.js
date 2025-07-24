import { useEffect, useState } from "react";
import trimmingDash from "../utils/TrimDash";

const buildServiceInfo = ({ price, serviceDiscountFlag, serviceDiscountPrice }) => ({
  price,
  serviceDiscountFlag,
  serviceDiscountPrice,
});

const buildCounselorInfo = ({ price, counselingDiscountFlag, counselingDiscountPrice }) => ({
  price,
  counselingDiscountFlag,
  counselingDiscountPrice,
});

export default function usePricingGroup(data, detailData, itemType) {
  const [pricingMap, setPricingMap] = useState({});

  useEffect(() => {
    if (!data || !detailData || !itemType) return;

    const subType = detailData?.subType?.toLowerCase() || "";
    let grouped = {};

    const groupIndividuPricing = () =>
      data.reduce((acc, item) => {
        const { duration, subType, location } = item;
        const levelKey = subType.toLowerCase();

        if (!acc[duration]) acc[duration] = {};
        if (location === null) {
          acc[duration][levelKey] = buildServiceInfo(item);
        } else {
          if (!acc[duration][levelKey]) acc[duration][levelKey] = {};
          acc[duration][levelKey][trimmingDash(location)] = buildServiceInfo(item);
        }
        return acc;
      }, {}); // combine it into object group of duration, where each of them includes level, price, flag, and discount price

    const groupDefaultPricing = () =>
      data.reduce((acc, item) => {
        const { duration, counselingType } = item;

        if (!acc[duration]) acc[duration] = {};
        acc[duration][counselingType] = buildServiceInfo(item);
        return acc;
      }, {});

    const groupAssessmentPricing = () =>
      data.reduce((acc, item) => {
        const { audienceQuantity } = item;

        if (!acc[audienceQuantity]) acc[audienceQuantity] = {};
        acc[audienceQuantity] = buildServiceInfo(item);
        return acc;
      }, {});

    const groupWawancaraPricing = () =>
      data.reduce((acc, item) => {
        const { duration, counselingType, targetAudience } = item;

        if (!acc[duration]) acc[duration] = {};
        if (!acc[duration][counselingType]) acc[duration][counselingType] = {};
        acc[duration][counselingType][targetAudience] = buildServiceInfo(item);
        return acc;
      }, {});

    const groupCounselorPricing = () =>
      data.reduce((acc, item) => {
        const { duration, counselingType } = item;

        if (!acc[duration]) acc[duration] = {};
        acc[duration][counselingType] = buildCounselorInfo(item);
        return acc;
      }, {});

    if (itemType.includes("service")) {
      if (subType.includes("individu")) {
        grouped = groupIndividuPricing();
      } else if (subType.includes("pasangan") || subType.includes("keluarga") ||
        subType.includes("theraphy")
      ) {
        grouped = groupDefaultPricing();
      } else if (subType.includes("assessment")) {
        grouped = groupAssessmentPricing();
      } else if (subType.includes("wawancara")) {
        grouped = groupWawancaraPricing();
      }
    } else if (itemType.includes("counselor")) {
      grouped = groupCounselorPricing();
    }

    setPricingMap(grouped);
  }, [data, detailData, itemType]);

  return pricingMap;
}
