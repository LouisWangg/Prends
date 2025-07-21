import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { HiStar } from "react-icons/hi";

import "./SingleCard.css";
import "./ArticleCard.css";
import formatToRupiah from "../utils/FormatPrice";

const SingleCard = ({ itemType, data }) => {
  const navigate = useNavigate();

  let id, imageData, singleCardContent;
  const lowerCaseType = itemType.toLowerCase();
  const singleCard = data;

  if (lowerCaseType.includes("service")) {
    id = singleCard.serviceTypeId;
    imageData = singleCard?.ServiceTypeImages?.[0]?.image || null;
  } else if (lowerCaseType.includes("class")) {
    id = singleCard.classId;
    imageData = singleCard?.image || null;
  } else if (lowerCaseType.includes("counselor")) {
    id = singleCard.counselorId;
    imageData = singleCard?.CounselorImages?.[0]?.image || null;
  } else if (lowerCaseType.includes("article")) {
    imageData = singleCard?.ArticleImage?.image || null;
  }

  if (
    lowerCaseType.includes("service") ||
    lowerCaseType.includes("class") ||
    lowerCaseType.includes("counselor")
  ) {
    singleCardContent = (
      <Card className="singleCard">
        <div className="singleCardImageWrapper">
          <CardMedia
            component="img"
            src={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
            alt={singleCard.name}
            className="singleCardImage"
          />
          {singleCard.discountFlag && <div className="obralBadge">Obral</div>}
        </div>
        <CardContent className="singleCardContent">
          <Typography variant="subtitle1" sx={{ fontSize: "16px" }}>
            {singleCard.name}
          </Typography>
          <Typography variant="body2">
            {lowerCaseType.includes("counselor") && parseInt(singleCard.commentCount) > 0 ? (
              <span className="singleCardStarWrapper">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} className="cardStarSize" />
                ))}
                <span>({singleCard.commentCount})</span>
              </span>
            ) : (
              <></>
            )}
          </Typography>
          <Typography sx={{ fontSize: 0 }}>
            {singleCard.discountFlag ? (
              <>
                <span className="oldPrice">
                  {formatToRupiah(singleCard.price)}
                </span>
                <span className="newPrice">
                  Dari {formatToRupiah(singleCard.discountPrice)}
                </span>
              </>
            ) : (
              <span className="newPrice">
                Dari {formatToRupiah(singleCard.price)}
              </span>
            )}
          </Typography>
        </CardContent>
      </Card>
    );
  } else if (lowerCaseType.includes("homearticle")) {
    singleCardContent = (
      <Card className="articleCard">
        <CardMedia
          component="img"
          height="200px"
          src={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
          alt={singleCard.title}
          className="cardImage"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" className="homeCardTitle">
            {singleCard.title}
          </Typography>
          <Typography variant="body1">{singleCard.subTitle}</Typography>
        </CardContent>
      </Card>
    );
  } else if (lowerCaseType.includes("article")) {
    singleCardContent = (
      <Card className="articleCard">
        <CardMedia
          component="img"
          height="320px"
          src={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
          alt={singleCard.title}
          className="cardImage"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" className="cardTitle">
            {singleCard.title}
          </Typography>
          <Typography variant="caption">{singleCard.createdAt}</Typography>
          <Typography variant="body1" sx={{ marginTop: "5px" }}>
            {singleCard.subTitle}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <a
      href={`/detail-page/${lowerCaseType}/${id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/detail-page/${lowerCaseType}/${id}`);
      }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {singleCardContent}
    </a>
  );
};

export default SingleCard;
