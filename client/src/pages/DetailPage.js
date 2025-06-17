import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FiPlus, FiMinus, FiShare, FiUser } from "react-icons/fi";
import { HiStar, HiOutlineStar } from "react-icons/hi";

import "./DetailPage.css";
import judgeMeIcon from "../assets/judgeme-icon.svg";
import diamondTransparency from "../assets/diamond.svg";
import levelLabeling from "../utils/LevelLabel";
import formatToRupiah from "../utils/FormatPrice";
import Description from "../components/Description";
import { fetchServiceDetailById } from "../services/ServiceTypeService";
import { fetchServicePricingById } from "../services/ServiceTypePriceService";
import { fetchServiceFeedbacksById } from "../services/ServiceTypeFeedbackService";
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
  const [sortOption, setSortOption] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState([]);

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
      const {
        duration,
        level,
        price,
        serviceDiscountFlag,
        serviceDiscountPrice,
      } = item;
      const levelKey = level.toLowerCase();

      if (!acc[duration]) acc[duration] = {};
      acc[duration][levelKey] = {
        price,
        serviceDiscountFlag,
        serviceDiscountPrice,
      };
      return acc;
    }, {}); // combine it into object group of duration, where each of them includes level, price, flag, and discount price
    setPricingMap(grouped);
    setDurationList(Object.keys(grouped).map((d) => parseInt(d, 10)));
  }, [id]);

  const getServiceFeedbacksById = useCallback(async () => {
    const datas = await fetchServiceFeedbacksById(id);
    setFeedback(datas.datas);
    setFeedbackCount(datas.counts);
  }, [id]);

  useEffect(() => {
    getDetailData();
    getDescriptionsAndNotices();
    getPricingData();
    getServiceFeedbacksById();
  }, [
    getDetailData,
    getDescriptionsAndNotices,
    getPricingData,
    getServiceFeedbacksById,
  ]);

  const selectedPrice = pricingMap?.[duration]?.[level]?.serviceDiscountFlag
    ? pricingMap[duration][level].serviceDiscountPrice
    : pricingMap?.[duration]?.[level]?.price;

  const eachCount = {
    5: feedbackCount.ratingFive,
    4: feedbackCount.ratingFour,
    3: feedbackCount.ratingThree,
    2: feedbackCount.ratingTwo,
    1: feedbackCount.ratingOne,
  };

  const totalScore = Object.entries(eachCount).reduce(
    (sum, [rating, count]) => sum + rating * count,
    0
  );

  const averageRating = feedbackCount.total === 0 ? 0 : (totalScore / feedbackCount.total).toFixed(2);

  return (
    <div style={{ margin: "30px 70px" }}>
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
              <HiStar key={i} className="starSize" />
            ))}
            <span>{averageRating} dari 5</span>
          </div>
          <div className="bottomRow">
            <span>Berdasarkan {feedbackCount.total} ulasan</span>
            <img src={judgeMeIcon} alt="Judge Me Verified Icon" />
          </div>
        </div>
        <div className="starRatingLine" />
        <div className="starRatingRightWrapper">
          {[5, 4, 3, 2, 1].map((starCount, index) => {
            const count = eachCount[starCount] || 0;
            const percentage = feedbackCount.total
              ? (count / feedbackCount.total) * 100
              : 0;

            return (
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
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="ratingCount">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="detailPageLine" />
      <div className="diamondWrapper">
        <a
          href="https://judge.me/reviews/stores/kleeverse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="diamondImageAndText"
          title="Diamond Transparent Shop. Published 100% of verified reviews received in total"
        >
          <img src={diamondTransparency} alt="Diamond Transparent Shop" />
          <p className="diamondText">100.0</p>
        </a>
        <div className="bottomRow">
          <a
            href="https://judge.me/reviews/stores/kleeverse.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Verified
          </a>
          <img src={judgeMeIcon} alt="Judge Me Verified Icon" />
        </div>
      </div>
      <hr className="detailPageLine" />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="commentSortSelector"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>
      <hr className="detailPageLine" />
      <div className="commentWrapper">
        <div className="starAndDateWrapper">
          <div className="stars">
            <HiStar className="starSize" />
            <HiStar className="starSize" />
            <HiStar className="starSize" />
            <HiStar className="starSize" />
            <HiStar className="starSize" />
          </div>
          <span>04/26/2025</span>
        </div>
        <div className="identityWrapper">
          <FiUser className="commentUserIcon" />
          <span>Nama User</span>
        </div>
        <div className="contentWrapper">
          <p>
            <b>Kesan dan pesan</b>
          </p>
          <p>Tidak ada yang berkesan dalam acara ini</p>
        </div>
        <hr className="detailPageLine" />
      </div>
    </div>
  );
};

export default DetailPage;
