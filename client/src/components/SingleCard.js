import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { HiStar } from "react-icons/hi";

import "./SingleCard.css";
import "./ArticleCard.css";
import formatToRupiah from "../utils/FormatPrice";

const SingleCard = ({ type, data }) => {
  const navigate = useNavigate();

  let id, imageData, singleCardContent;
  const singleCard = data;

  if (type.includes("Service")) {
    id = singleCard.serviceTypeId;
    imageData = singleCard?.ServiceTypeImages?.[0]?.image || null;
  } else if (type.includes("Class")) {
    id = singleCard.classId;
    imageData = singleCard?.image || null;
  } else if (type.includes("Counselor")) {
    id = singleCard.counselorId;
    imageData = singleCard?.CounselorImages?.[0]?.image || null;
  } else if (type.includes("Article")) {
    imageData = singleCard?.ArticleImage?.image || null;
  }

  if (
    type.includes("Service") ||
    type.includes("Class") ||
    type.includes("Counselor")
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
          <Typography variant="subtitle1">
            {singleCard.name}
          </Typography>
          <Typography variant="body2">
            {type === 'Counselor' && singleCard.commentCount !== undefined ? (
              <div className="singleCardStarWrapper">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} className="cardStarSize" />
                ))}
                <span>({singleCard.commentCount})</span>
              </div>
            ) : (
              <></>
            )}
          </Typography>
          <Typography variant="caption" className="singleCardPrice">
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
              <span className="newPrice">Dari {formatToRupiah(singleCard.price)}</span>
            )}
          </Typography>
        </CardContent>
      </Card>
    );
  } else if (type.includes("HomeArticle")) {
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
  } else if (type.includes("Article")) {
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

  return <a
    href={`/detail-page/${type.toLowerCase()}/${id}`}
    onClick={(e) => {
      e.preventDefault();
      navigate(`/detail-page/${type.toLowerCase()}/${id}`);
    }}
    style={{ textDecoration: "none", color: "inherit" }}
  >
    {singleCardContent}
  </a>;
};

export default SingleCard;
