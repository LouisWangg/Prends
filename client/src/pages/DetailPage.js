import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FiPlus, FiMinus, FiShare } from "react-icons/fi";
import { HiStar, HiOutlineStar } from "react-icons/hi";

import "./DetailPage.css";
import judgeMeIcon from "../assets/judgeme-icon.svg";
import levelLabeling from "../utils/LevelLabel";
import formatToRupiah from "../utils/FormatPrice";
import Description from "../components/Description";
import { fetchServiceDetailById } from "../services/ServiceTypeService";
import { fetchServicePricingById } from "../services/ServiceTypePriceService";
import { fetchDescriptionsAndNotices } from "../services/SharedDescriptionService";

const DetailPage = () => {
  const { type, id } = useParams();

  const [duration, setDuration] = useState(1);
  const [durationList, setDurationList] = useState([]);
  const [level, setLevel] = useState("junior");
  const [quantity, setQuantity] = useState(1);
  const [descriptions, setDescriptions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [pricingMap, setPricingMap] = useState({});

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
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
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert("Link copied!"))
      .catch(() => alert("Failed to copy link"));
  };

  const getDescriptionsAndNotices = useCallback(async () => {
    const datas = await fetchDescriptionsAndNotices(type, id);
    setDescriptions(datas.descriptions);
    setNotices(datas.notices);
  }, [type, id]);

  const getDetailData = useCallback(async () => {
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
  }, [type, id]);

  const getPricingData = useCallback(async () => {
    const data = await fetchServicePricingById(id);
    const grouped = data.reduce((acc, item) => {
      const { duration, level, price, serviceDiscountFlag, serviceDiscountPrice } = item;
      const levelKey = level.toLowerCase();

      if (!acc[duration]) acc[duration] = {};
      acc[duration][levelKey] = { price, serviceDiscountFlag, serviceDiscountPrice };
      return acc;
    }, {}); // combine it into object group of duration, where each of them includes level, price, flag, and discount price
    setPricingMap(grouped);
    setDurationList(Object.keys(grouped).map((d) => parseInt(d, 10)));
  }, [id]);

  useEffect(() => {
    getDetailData();
    getDescriptionsAndNotices();
    getPricingData();
  }, [getDetailData, getDescriptionsAndNotices, getPricingData]);

  const selectedPrice = pricingMap?.[duration]?.[level]
    ?.serviceDiscountFlag
    ? pricingMap[duration][level].serviceDiscountPrice
    : pricingMap?.[duration]?.[level]?.price;

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
            {pricingMap?.[duration]?.[level]?.serviceDiscountFlag ? (
              <div className="discountedPriceWrapper">
                <span className="obralText">
                  {formatToRupiah(pricingMap?.[duration]?.[level]?.price)}
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
            {durationList.map((durationValue) => (
              <Box
                key={durationValue}
                component="label"
                className={`detailPageLabel ${duration === durationValue ? "activeMode" : ""}`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={durationValue}
                  checked={duration === durationValue}
                  onChange={handleDurationChange}
                  className="detailPageRadio"
                />
                {durationValue} jam
              </Box>
            ))}
          </fieldset>

          <fieldset className="detailPageFieldSet">
            <legend className="detailPageLegend">Expert</legend>
            {pricingMap[duration] &&
              Object.keys(pricingMap[duration]).map((levelValue) => (
                <Box
                  key={levelValue}
                  component="label"
                  className={`detailPageLabel ${level === levelValue ? "activeMode" : ""}`}
                >
                  <input
                    type="radio"
                    name="level"
                    value={levelValue}
                    checked={level === levelValue}
                    onChange={handleLevelChange}
                    className="detailPageRadio"
                  />
                  {levelLabeling[levelValue] || levelValue}
                </Box>
              ))}
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
      <div className="starRatingTitleWrapper">
        <Typography variant="h5">Ulasan pelanggan</Typography>
      </div>
      <div className="starRatingWrapper">
        <div className="starRatingLeftWrapper">
          <div className="upperRow">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar key={i} className="leftStar" />
            ))}
            <span>5.00 dari 5</span>
          </div>
          <div className="bottomRow">
            <span>Berdasarkan 12 ulasan</span>
            <img src={judgeMeIcon} alt="Judge Me Verified Icon" />
          </div>
        </div>
        <div className="starRatingLine" />
        <div className="starRatingRightWrapper">
          {[5, 4, 3, 2, 1].map((starCount, index) => (
            <div className="rightRow" key={index}>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < starCount ? (
                    <HiStar key={i} />
                  ) : (
                    <HiOutlineStar key={i} />
                  )
                )}
              </div>
              <div className="ratingBarWrapper">
                <div
                  className="ratingBarFill"
                  style={{ width: `${starCount * 20}%` }}
                ></div>
              </div>
              <div className="ratingCount">26</div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DetailPage;
