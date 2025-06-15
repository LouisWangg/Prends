import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FiPlus, FiMinus, FiShare } from "react-icons/fi";

import "./DetailPage.css";
import formatToRupiah from "../utils/FormatPrice";
import Description from "../components/Description";
import { fetchServiceDetailById } from "../services/ServiceTypeService";
import { fetchServicePricingById } from "../services/ServiceTypePriceService";
import { fetchDescriptionsAndNotices } from "../services/SharedDescriptionService";

const DetailPage = () => {
  const { type, id } = useParams();

  const [duration, setDuration] = useState(1);
  const [expertLevel, setExpertLevel] = useState("junior");
  const [quantity, setQuantity] = useState(1);
  const [descriptions, setDescriptions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [pricingMap, setPricingMap] = useState({});

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const handleExpertLevelChange = (event) => {
    setExpertLevel(event.target.value);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("Link copied!"))
      .catch(() => alert("Failed to copy link"));
  };

  const getDescriptionsAndNotices = async () => {
    const datas = await fetchDescriptionsAndNotices(type, id);
    setDescriptions(datas.descriptions);
    setNotices(datas.notices);
  };

  const getDetailData = async () => {
    let data;
    if (type.includes("service")) {
      data = await fetchServiceDetailById(id);
    } else if (type.includes("class")) {
      // data = await fetchClassById(id);
    } else if (type.includes("counselor")) {
      // data = await fetchCounselorById(id);
    } else if (type.includes("article")) {
      // data = await fetchArticleById(id);
    }
    setDetailData(data);
  };

  const getPricingData = async () => {
    const data = await fetchServicePricingById(id);
    const grouped = data.reduce((acc, item) => {
      const { duration, level, price, serviceDiscountFlag, serviceDiscountPrice } = item;
      const levelKey = level.toLowerCase();
      if (!acc[duration]) acc[duration] = {};
      acc[duration][levelKey] = { price, serviceDiscountFlag, serviceDiscountPrice };
      return acc;
    }, {}); // combine it into object group of duration, where each of them includes level, price, flag, and discount price
    setPricingMap(grouped);
  };

  useEffect(() => {
    getDetailData();
    getDescriptionsAndNotices();
    getPricingData();
  }, [type, id]);

  const selectedPrice =
    pricingMap?.[duration]?.[expertLevel]?.serviceDiscountFlag
      ? pricingMap[duration][expertLevel].serviceDiscountPrice
      : pricingMap?.[duration]?.[expertLevel]?.price;

  return (
    <Fragment>
      <div className="detailPageWrapper">
        <div className="detailPageImage">
          <img
            src={
              detailData?.ServiceTypeImages?.[0]?.image
                ? `data:image/jpeg;base64,${detailData.ServiceTypeImages[0].image}`
                : null
            }
            alt={detailData.name}
          />
        </div>
        <div className="detailPageContent">
          <Typography variant="body1">prends</Typography>
          <Typography variant="h3" className="detailPageTitle">
            {detailData.name}
          </Typography>
          <Typography variant="h6">
            {/* {selectedPrice ? formatToRupiah(selectedPrice) : "-"} */}
            {pricingMap?.[duration]?.[expertLevel]?.serviceDiscountFlag ? (
              <div className="discountedPriceWrapper">
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    marginRight: "8px",
                  }}
                >
                  {formatToRupiah(pricingMap?.[duration]?.[expertLevel]?.price)}
                </span>

                <div className="discountedPriceAndBadgeWrapper">
                  {formatToRupiah(selectedPrice)}
                  <span>Obral</span>
                </div>
              </div>
            ) : (
              <>{formatToRupiah(selectedPrice)}</>
            )}
          </Typography>

          <fieldset className="detailPageFieldSet">
            <legend className="detailPageLegend">Durasi Konseling</legend>
            <Box
              component="label"
              className={`detailPageLabel ${duration === 1 ? "activeMode" : ""}`}
            >
              <input
                type="radio"
                name="duration"
                value="1"
                checked={duration === 1}
                onChange={handleDurationChange}
                className="detailPageRadio"
              />
              1 jam
            </Box>

            <Box
              component="label"
              className={`detailPageLabel ${duration === 2 ? "activeMode" : ""}`}
            >
              <input
                type="radio"
                name="duration"
                value="2"
                checked={duration === 2}
                onChange={handleDurationChange}
                className="detailPageRadio"
              />
              2 jam
            </Box>
          </fieldset>

          <fieldset className="detailPageFieldSet">
            <legend className="detailPageLegend">Expert</legend>
            <Box
              component="label"
              className={`detailPageLabel ${expertLevel === "junior" ? "activeMode" : ""}`}
            >
              <input
                type="radio"
                name="expertLevel"
                value="junior"
                checked={expertLevel === "junior"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Junior Expert
            </Box>

            <Box
              component="label"
              className={`detailPageLabel ${expertLevel === "middle" ? "activeMode" : ""}`}
            >
              <input
                type="radio"
                name="expertLevel"
                value="middle"
                checked={expertLevel === "middle"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Middle Expert
            </Box>

            <Box
              component="label"
              className={`detailPageLabel ${expertLevel === "senior" ? "activeMode" : ""}`}
            >
              <input
                type="radio"
                name="expertLevel"
                value="senior"
                checked={expertLevel === "senior"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Senior Expert
            </Box>
          </fieldset>

          <div className="quantityWrapper">
            <Typography
              variant="body2"
              className="detailPageLegend"
              sx={{ marginBottom: "8px" }}
            >
              Jumlah
            </Typography>
            <div className="quantityInputWrapper">
              <button
                onClick={handleDecreaseQuantity}
                aria-label="Decrease quantity"
              >
                <FiMinus />
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                readOnly
              />
              <button
                onClick={handleIncreaseQuantity}
                aria-label="Increase quantity"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="transactionButtonWrapper">
            <button className="basketBtn">Tambahkan ke keranjang</button>
            <button className="buyBtn">Beli sekarang</button>
          </div>

          {descriptions.map((description, index) => (
            <Fragment key={description.sharedDescriptionId}>
              <Description data={description} secondData={detailData} />
            </Fragment>
          ))}

          <div>
            <b>Perhatian :</b>
            <ol className="detailPageNoticeOrderedList">
              {notices.map((notice, index) => (
                <Fragment key={notice.sharedDescriptionId}>
                  <li>
                    {
                      <span
                        dangerouslySetInnerHTML={{ __html: notice.description }}
                      />
                    }
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>

          <div className="shareWrapper" onClick={handleShareClick}>
            <FiShare />
            <button>Share</button>
          </div>
        </div>
      </div>
      <div className="starRatingWrapper">
        <Typography variant="h5">Ulasan Pelanggan</Typography>
      </div>
    </Fragment>
  );
};

export default DetailPage;
