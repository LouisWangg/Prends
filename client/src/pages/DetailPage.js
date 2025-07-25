import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { FiPlus, FiMinus, FiShare } from "react-icons/fi";
import { HiStar, HiOutlineStar } from "react-icons/hi";

import "./DetailPage.css";
import judgeMeIcon from "../assets/judgeme-icon.svg";
import diamondTransparency from "../assets/diamond.svg";

import levelLabeling from "../utils/LevelLabel";
import formatToRupiah from "../utils/FormatPrice";

import usePricingGroup from "../hooks/usePricingGroup";

import Option from "../components/Option";
import Pagination from "../components/Pagination";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";
import Description from "../components/Description";
import CommentSection from "../components/CommentSection";
import ProfileImageSwitcher from "../components/ProfileImageSwitcher";

import { fetchServiceDetailById } from "../services/ServiceTypeService";
import { fetchServicePricingById } from "../services/ServiceTypePriceService";
import { fetchServiceCommentsById } from "../services/ServiceTypeCommentService";
import { fetchDescriptionsAndNotices } from "../services/SharedDescriptionService";
import { fetchIndividualCounselingRecommendations } from "../services/RecommendationService";

import { fetchClassDetailById } from "../services/ClassService";

import { fetchCounselorDetailById } from "../services/CounselorService";
import { fetchCounselorPricingById } from "../services/CounselorPriceService";
import { fetchCounselorCommentsById } from "../services/CounselorCommentService";
import { fetchCounselorRecommendations } from "../services/RecommendationService";

const DetailPage = () => {
  const { type, id } = useParams();

  const [duration, setDuration] = useState(1);
  const [audienceQuantity, setAudienceQuantity] = useState(1);
  const [level, setLevel] = useState("junior");
  const [locationValue, setLocationValue] = useState("Tanah Abang - Jakarta");
  const [counselingType, setCounselingType] = useState("Online Chat Individu");
  const [targetAudience, setTargetAudience] = useState("Wawancara Tugas");
  const [quantity, setQuantity] = useState(1);
  const [descriptions, setDescriptions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [pricingData, setPricingData] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const commentsPerPage = 5;
  const topCommentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const hasSetDefaults = useRef(false);
  const hasSetSecondDefaults = useRef(false);
  const detailType = detailData?.subType?.toLowerCase?.() || "";

  const pricingMap = usePricingGroup(pricingData, detailData, type);

  let isLocationBased = null;
  let discountFlag, undiscountedPrice, discountedPrice;
  if (type.includes("service")) {
    if (detailType?.includes("individu")) {
      isLocationBased =
        typeof pricingMap[duration]?.[level]?.[
        Object.keys(pricingMap[duration]?.[level] || {})[0]
        ] === "object";

      if (isLocationBased) {
        discountFlag =
          pricingMap?.[duration]?.[level]?.[locationValue]?.serviceDiscountFlag;
        undiscountedPrice =
          pricingMap?.[duration]?.[level]?.[locationValue]?.price;
        discountedPrice =
          pricingMap?.[duration]?.[level]?.[locationValue]?.serviceDiscountPrice;
      } else {
        discountFlag = pricingMap?.[duration]?.[level]?.serviceDiscountFlag;
        undiscountedPrice = pricingMap?.[duration]?.[level]?.price;
        discountedPrice = pricingMap?.[duration]?.[level]?.serviceDiscountPrice;
      }
    } else if (detailType?.includes("pasangan") || detailType?.includes("keluarga") || detailType?.includes("theraphy")) {
      discountFlag = pricingMap?.[duration]?.[counselingType]?.serviceDiscountFlag;
      undiscountedPrice = pricingMap?.[duration]?.[counselingType]?.price;
      discountedPrice = pricingMap?.[duration]?.[counselingType]?.serviceDiscountPrice;
    } else if (detailType?.includes("assessment")) {
      discountFlag = pricingMap?.[audienceQuantity]?.serviceDiscountFlag;
      undiscountedPrice = pricingMap?.[audienceQuantity]?.price;
      discountedPrice = pricingMap?.[audienceQuantity]?.serviceDiscountPrice;
    } else if (detailType?.includes("wawancara")) {
      discountFlag = pricingMap?.[duration]?.[counselingType]?.[targetAudience]?.serviceDiscountFlag;
      undiscountedPrice = pricingMap?.[duration]?.[counselingType]?.[targetAudience]?.price;
      discountedPrice = pricingMap?.[duration]?.[counselingType]?.[targetAudience]?.serviceDiscountPrice;
    }

  } else if (type.includes("counselor")) {
    discountFlag = pricingMap?.[duration]?.[counselingType]?.counselingDiscountFlag;
    undiscountedPrice = pricingMap?.[duration]?.[counselingType]?.price;
    discountedPrice = pricingMap?.[duration]?.[counselingType]?.counselingDiscountPrice;
  } else if (type.includes("class")) {
    discountFlag = detailData?.discountFlag;
    undiscountedPrice = detailData?.price;
    discountedPrice = detailData.discountPrice;
  }

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

  const averageRating =
    commentCount.total === 0 ? 0 : (totalScore / commentCount.total).toFixed(2);

  const totalPages = Math.ceil(comments.length / commentsPerPage);
  const paginatedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  const getRecommendationKey = (item) => {
    switch (item.type) {
      case "service":
        return `service-${item.serviceTypeId}`;
      case "counselor":
        return `counselor-${item.counselorId}`;
      default:
        return `${item.type}-${Math.random()}`; // safe fallback
    }
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const handleAudienceQuantityChange = (event) => {
    setAudienceQuantity(parseInt(event.target.value, 10));
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  };

  const handleTargetAudienceChange = (event) => {
    setTargetAudience(event.target.value);
  };

  const handleCounselingTypeChange = (event) => {
    setCounselingType(event.target.value);
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
    await getCommentData(newSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);

    setTimeout(() => {
      const element = topCommentRef.current;
      const navbar = document.querySelector(".navbarWrapper.sticky"); // grab the sticky nav if it's active
      const yOffset = navbar ? -navbar.offsetHeight : -80; // fallback if sticky isn't applied
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }, 0);
  };

  const getCommentData = useCallback(
    async (sort = sortOption) => {
      let datas;
      if (type.includes("service")) {
        datas = await fetchServiceCommentsById({ id, sort });
      } else if (type.includes("counselor")) {
        datas = await fetchCounselorCommentsById({ id, sort });
      }

      setComments(datas.datas);
      setCommentCount(datas.counts);
    },
    [type, id, sortOption]
  );

  //Reset states
  useEffect(() => {
    setDuration(1);
    setLevel("junior");
    setLocationValue("Tanah Abang - Jakarta");
    setCounselingType("Online Chat Individu");
    setAudienceQuantity(1);
    setTargetAudience("Wawancara Tugas")
    setQuantity(1);
    setDescriptions([]);
    setNotices([]);
    setDetailData({});
    setSortOption("newest");
    setComments([]);
    setCommentCount([]);
    setCurrentPage(1);
    setRecommendations([]);
    //scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, type]);

  //First, fetch detail data only
  useEffect(() => {
    const getDetailData = async () => {
      let data;

      if (type.includes("service")) {
        data = await fetchServiceDetailById(id);
      } else if (type.includes("class")) {
        data = await fetchClassDetailById(id);
      } else if (type.includes("counselor")) {
        data = await fetchCounselorDetailById(id);
      } else if (type.includes("article")) {
        // data = await fetchArticleById(id);
      }
      setDetailData(data);
    };

    getDetailData();
  }, [type, id]);

  //Second, detail data used to fetch another data
  useEffect(() => {
    if ((type.includes("counselor") && !detailData?.subType)
      || (type.includes("service") && !detailData?.subType)) {
      return;
    }

    const load = async () => {
      const getDescriptionsAndNotices = async () => {
        let subType;

        if (type.includes("service")) {
          subType = detailData?.subType;
        } else if (type.includes("counselor")) {
          subType = detailData?.subType;
        } else {
          subType = undefined;
        }

        const datas = await fetchDescriptionsAndNotices(type, id, subType);
        setDescriptions(datas.descriptions);
        setNotices(datas.notices);
      };

      const getPricingData = async () => {
        if (type.includes("service")) {
          const data = await fetchServicePricingById(id);
          setPricingData(data);
        } else if (type.includes("counselor")) {
          const data = await fetchCounselorPricingById(id);
          setPricingData(data);
        }
      };

      const getRecommendationData = async () => {
        let datas;

        if (type.includes("service") || type.includes("class")) {
          datas = await fetchIndividualCounselingRecommendations(id, "Individual");
        } else if (type.includes("counselor")) {
          datas = await fetchCounselorRecommendations(id, detailData.subType);
        }
        setRecommendations(datas);
      };

      await getDescriptionsAndNotices();
      if (type.includes("service") || type.includes("counselor")) {
        getPricingData();
        getCommentData();
      }
      getRecommendationData();
    };

    load();
  }, [type, id, detailData, getCommentData]);

  //Fourth, set Options value once pricingMap is ready
  useEffect(() => {
    const isPricingMapReady = pricingMap && Object.keys(pricingMap).length > 0;
    if (!isPricingMapReady || hasSetDefaults.current) return;

    if (detailType?.includes("individu")) {
      const firstLevel = Object.keys(pricingMap[duration] || {})[0];
      if (firstLevel) setLevel(firstLevel);
    }

    if (type.includes("service") && isLocationBased) {
      const levelMap = pricingMap[duration]?.[level] || {};
      const firstLocation = Object.keys(levelMap)[0];
      if (firstLocation) setLocationValue(firstLocation);
    }

    if (type.includes("counselor") || (type.includes("service") && !detailType?.includes("individu"))) {
      const firstType = Object.keys(pricingMap[duration] || {})[0];
      if (firstType) setCounselingType(firstType);
    }

    hasSetDefaults.current = true;
  }, [pricingMap, duration, type, detailType, level, isLocationBased]);

  //Fifth, set value only for the Target Audience since it use Counseling Type
  useEffect(() => {
    const isPricingMapReady = pricingMap && Object.keys(pricingMap).length > 0;
    const counselingTypeReady = isPricingMapReady && counselingType;

    if (!counselingTypeReady || hasSetSecondDefaults.current) return;

    if (detailType?.includes("wawancara")) {
      const targetAudienceMap = pricingMap?.[duration]?.[counselingType] || {};
      const firstTargetAudience = Object.keys(targetAudienceMap)[0];
      if (firstTargetAudience) {
        setTargetAudience(firstTargetAudience);
        hasSetSecondDefaults.current = true;
      }
    }

  }, [pricingMap, duration, counselingType, detailType]);


  const renderImage = () => {
    let images;

    if (type.includes("service")) {
      images = detailData?.ServiceTypeImages?.map((img) => img.image) || [];
    } else if (type.includes("class")) {
      images = detailData?.image ? detailData.image : null;
    } else if (type.includes("counselor")) {
      images = detailData?.CounselorImages?.map((img) => img.image) || [];
    }

    return (
      <ProfileImageSwitcher images={images} />
    );

    // if (type.includes("service")) {
    //   return (
    //     <div className="detailPageImage">
    //       <img
    //         src={
    //           detailData?.ServiceTypeImages?.[0]?.image
    //             ? `data:image/jpeg;base64,${detailData.ServiceTypeImages[0].image}`
    //             : null
    //         }
    //         alt={detailData.name}
    //       />
    //     </div>
    //   );
    // } else if (type.includes("class")) {
    //   return (
    //     <div className="detailPageImage">
    //       <img
    //         src={
    //           detailData?.image
    //             ? `data:image/jpeg;base64,${detailData.image}`
    //             : null
    //         }
    //         alt={detailData.name}
    //       />
    //     </div>
    //   );
    // } else if (type.includes("counselor")) {
    //   return (
    //     <div className="detailPageImage">
    //       <img
    //         src={
    //           detailData?.CounselorImages?.[0]?.image
    //             ? `data:image/jpeg;base64,${detailData.CounselorImages[0].image}`
    //             : null
    //         }
    //         alt={detailData.name}
    //       />
    //     </div>
    //   );
    // }
  };

  const renderRating = () => {
    if (commentCount.total !== undefined && Number(commentCount.total) !== 0) {
      return (
        <div className="detailPageRateWrapper">
          {Array.from({ length: 5 }).map((_, i) => (
            <HiStar key={i} className="starSize" />
          ))}
          <span>{commentCount.total} ulasan</span>
        </div>
      );
    }
  };

  const renderPrice = () => {
    return (
      <Typography variant="h6">
        {discountFlag ? (
          <div className="discountedPriceWrapper">
            <span className="obralText">
              {formatToRupiah(undiscountedPrice)}
            </span>

            <div className="discountedPriceAndBadgeWrapper">
              {formatToRupiah(discountedPrice)}
              <span>Obral</span>
            </div>
          </div>
        ) : (
          <>{formatToRupiah(undiscountedPrice)}</>
        )}
      </Typography>
    );
  };

  const renderDurationOption = () => {
    const durationTitle = detailType?.includes("theraphy") || detailType?.includes("wawancara") ? "Durasi" : "Durasi Konseling";

    const durationLabel = (detailData?.name?.toLowerCase?.().includes("naomi") && detailType?.includes("pasangan")) ||
      detailType?.includes("keluarga") || detailType?.includes("wawancara");

    if ((type.includes("service") && !detailType?.includes("assessment")) || type.includes("counselor")) {
      return (
        <Option
          title={durationTitle}
          name="duration"
          selected={duration.toString()}
          options={Object.fromEntries(
            Object.keys(pricingMap).map((d) => [d.toString(), d.toString()])
          )}
          onChange={handleDurationChange}
          labelMapper={(key) => `${key} ${durationLabel ? "jam" : "sesi"}`}
        />
      );
    }
    return null;
  };

  const renderAudienceQuantityOption = () => {
    if (detailType?.includes("assessment")) {
      return (
        <Option
          title="Jumlah Peserta"
          name="audienceQuantity"
          selected={audienceQuantity.toString()}
          options={Object.fromEntries(
            Object.keys(pricingMap).map((d) => [d.toString(), d.toString()])
          )}
          onChange={handleAudienceQuantityChange}
          labelMapper={(key) => `${key} orang`}
        />
      );
    }
    return null;
  };

  const renderExpertOption = () => {
    if (detailType?.includes("individu")) {
      return (
        <Option
          title="Expert"
          name="level"
          selected={level}
          options={Object.fromEntries(
            Object.keys(pricingMap[duration] || {}).map((lvl) => [lvl, lvl])
          )}
          onChange={handleLevelChange}
          labelMapper={(key) => levelLabeling[key] || key}
        />
      );
    }
    return null;
  };

  const renderLocationOption = () => {
    if (type.includes("service") && isLocationBased) {
      return (
        <Option
          title="Lokasi"
          name="location"
          selected={locationValue}
          options={Object.fromEntries(
            Object.keys(pricingMap[duration][level]).map((loc) => [loc, loc])
          )}
          onChange={handleLocationChange}
        />
      );
    }
    return null;
  };

  const renderTargetAudienceOption = () => {
    if (detailType?.includes("wawancara")) {
      return (
        <Option
          title="Jenis"
          name="targetAudience"
          selected={targetAudience}
          options={Object.fromEntries(
            Object.keys(pricingMap?.[duration]?.[counselingType] || {}).map((aud) => [aud, aud])
          )}
          onChange={handleTargetAudienceChange}
        />
      );
    }
    return null;
  };

  const renderCounselingTypeOption = () => {
    const counselingTypeTitle = detailType?.includes("theraphy")
      ? "Jenis"
      : detailType?.includes("wawancara")
        ? "Sesi"
        : "Jenis Konseling";

    if (type.includes("counselor") ||
      (type.includes("service") && !detailType?.includes("individu") && !detailType?.includes("assessment"))) {
      return (
        <Option
          title={counselingTypeTitle}
          name="counselingType"
          selected={counselingType}
          options={Object.fromEntries(
            Object.keys(pricingMap[duration] || {}).map((type) => [type, type])
          )}
          onChange={handleCounselingTypeChange}
        />
      );
    }
    return null;
  };

  const renderDescription = () => {
    if (!type.includes("class")) {
      return (
        <>
          {detailType?.includes("pasangan") && detailData?.description?.trim?.() !== "" && (
            <b className="coupleAdditionalDescription">{detailData.description}</b>
          )}

          {descriptions?.map((description, index) => (
            <Fragment key={description.sharedDescriptionId}>
              <Description data={description} secondData={detailData} />
            </Fragment>
          ))}
        </>
      );
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: detailData.description }} />
      );
    }
  };

  const renderComment = () => {
    if (commentCount.total !== undefined && Number(commentCount.total) !== 0) {
      return (
        <>
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

          <div ref={topCommentRef}></div>
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
            onPageChange={handlePageChange}
          />
        </>
      );
    }
  };

  return (
    <div className="pageWrapper">
      <div className="detailPageWrapper">
        {renderImage()}

        <div className="detailPageContent">
          <Typography variant="body1">prends</Typography>
          <Typography variant="h3" className="detailPageTitle">
            {detailData.name}
          </Typography>

          {renderRating()}

          {renderPrice()}

          {renderDurationOption()}

          {renderAudienceQuantityOption()}

          {renderExpertOption()}

          {renderLocationOption()}

          {renderTargetAudienceOption()}

          {renderCounselingTypeOption()}

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

          {renderDescription()}

          <div>
            <b>Perhatian :</b>
            <ol className="detailPageNoticeOrderedList">
              {notices?.map((notice, index) => (
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

      {renderComment()}

      <div className="recommendationWrapper">
        <Typography variant="h4">You may also like</Typography>
        <HomeSection title="" subTitle="" columns={4} style={{ margin: "0px" }}>
          {recommendations.map((recommendation) => (
            <SingleCard
              key={getRecommendationKey(recommendation)}
              type={recommendation.type}
              data={recommendation}
              style={{ margin: "0px" }}
            />
          ))}
        </HomeSection>
      </div>
    </div>
  );
};

export default DetailPage;
