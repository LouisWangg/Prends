import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { FiPlus, FiMinus, FiShare } from "react-icons/fi";
import { HiStar, HiOutlineStar } from "react-icons/hi";

import "./DetailPage.css";
import judgeMeIcon from "../assets/judgeme-icon.svg";
import diamondTransparency from "../assets/diamond.svg";
import levelLabeling from "../utils/LevelLabel";
import formatToRupiah from "../utils/FormatPrice";
import Option from "../components/Option";
import Description from "../components/Description";
import CommentSection from "../components/CommentSection";
import Pagination from "../components/Pagination";
import { fetchServiceDetailById } from "../services/ServiceTypeService";
import { fetchServicePricingById } from "../services/ServiceTypePriceService";
import { fetchServiceCommentsById } from "../services/ServiceTypeCommentService";
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
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  
  const commentsPerPage = 5;
  const [currentPage, setCurrentPage] = useState((1));

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

  const handleSortChange = async (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    setCurrentPage(1); // 🔥 reset to first page
    await getServiceCommentsById(newSort);
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

  const getServiceCommentsById = useCallback(async (sort = sortOption) => {
    const datas = await fetchServiceCommentsById(id, sort);
    setComments(datas.datas);
    setCommentCount(datas.counts);
  }, [id, sortOption]);

  useEffect(() => {
    getDetailData();
    getDescriptionsAndNotices();
    getPricingData();
    getServiceCommentsById();
  }, [
    getDetailData,
    getDescriptionsAndNotices,
    getPricingData,
    getServiceCommentsById,
  ]);

  const selectedPrice = pricingMap?.[duration]?.[level]?.serviceDiscountFlag
    ? pricingMap[duration][level].serviceDiscountPrice
    : pricingMap?.[duration]?.[level]?.price;

  const eachCount = {
    5: commentCount.ratingFive,
    4: commentCount.ratingFour,
    3: commentCount.ratingThree,
    2: commentCount.ratingTwo,
    1: commentCount.ratingOne,
  };

  const totalScore = Object.entries(eachCount).reduce(
    (sum, [rating, count]) => sum + rating * count,
    0
  );

  const averageRating = commentCount.total === 0 ? 0 : (totalScore / commentCount.total).toFixed(2);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const paginatedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const durationListToObject = Object.fromEntries(durationList.map(d => [d, null]));

  return (
    <div style={{ margin: "0 70px" }}>
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

          <div className="detailPageRateWrapper">
            {Array.from({ length: 5 }).map((_, i) => (
              <HiStar key={i} className="starSize" />
            ))}
            <span>{commentCount.total} ulasan</span>
          </div>
          
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

          <Option
            title="Durasi Konseling"
            name="duration"
            selected={duration.toString()}
            options={durationListToObject}
            onChange={handleDurationChange}
            labelMapper={(key) => `${key} jam`}
          />

          <Option
            title="Expert"
            name="level"
            selected={level}
            options={pricingMap[duration] || {}}
            onChange={handleLevelChange}
            labelMapper={(key) => levelLabeling[key] || key}
          />

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
            <span>Berdasarkan {commentCount.total} ulasan</span>
            <img src={judgeMeIcon} alt="Judge Me Verified Icon" />
          </div>
        </div>
        <div className="starRatingLine" />
        <div className="starRatingRightWrapper">
          {[5, 4, 3, 2, 1].map((starCount, index) => {
            const count = eachCount[starCount] || 0;
            const percentage = commentCount.total
              ? (count / commentCount.total) * 100
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
        onChange={handleSortChange}
        className="commentSortSelector"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
      </select>
      <hr className="detailPageLine" />

      {paginatedComments.map((comment) => (
        <CommentSection key={comment.id} data={comment} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <div>
        <Typography variant="h4">You may also like</Typography>
        
      </div>

    </div>
  );
};

export default DetailPage;
