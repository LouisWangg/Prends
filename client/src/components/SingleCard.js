import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import formatToRupiah from "../utils/FormatPrice";
import "./SingleCard.css";
import "./ArticleCard.css";

const SingleCard = ({ type, data }) => {
  const navigate = useNavigate();

  let imageData, singleCardContent;
  const singleCard = data;

  if (type.includes("Service")) {
    imageData = singleCard?.ServiceTypeImages?.[0]?.image || null;
  } else if (type.includes("Class")) {
    imageData = singleCard?.image || null;
  } else if (type.includes("Counselor")) {
    imageData = singleCard?.CounselorImages?.[0]?.image || null;
  } else if (type.includes("Article")) {
    imageData = singleCard?.ArticleImage?.image || null;
  }

  const changePageHandle = () => {
    let id;

    if (type.includes("Service")) {
      id = singleCard.serviceTypeId;
    } else if (type.includes("Class")) {
      id = singleCard.classId;
    } else if (type.includes("Counselor")) {
      id = singleCard.counselorId;
    }

    navigate(`/detail-page/${type.toLowerCase()}/${id}`);
  };

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
            image={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
            alt={singleCard.name}
            className="singleCardImage"
          />
          {singleCard.discountFlag && <div className="obralBadge">Obral</div>}
        </div>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: "5px", textWrap: "nowrap" }}
          >
            {singleCard.name}
          </Typography>
          <Typography variant="caption" className="singleCardPrice">
            {singleCard.discountFlag ? (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "gray",
                    marginRight: "8px",
                  }}
                >
                  {formatToRupiah(singleCard.price)}
                </span>
                <span style={{ color: "black" }}>
                  Dari {formatToRupiah(singleCard.discountPrice)}
                </span>
              </>
            ) : (
              <>Dari {formatToRupiah(singleCard.price)}</>
            )}
          </Typography>
        </CardContent>
      </Card>
    );
    // } else if (type.includes("Level")) {
    //     singleCardContent = (
    //         <Card className="singleCard">
    //             <CardMedia
    //                 component="img"
    //                 image={singleCard.image}
    //                 alt={singleCard.title}
    //                 className="singleCardImage"
    //             />
    //             <CardContent sx={{ textAlign: "center" }}>
    //                 <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
    //                     {singleCard.title}
    //                 </Typography>
    //                 <Typography variant="caption" className="singleCardPrice">
    //                     {singleCard.date}
    //                 </Typography>
    //             </CardContent>
    //         </Card>
    //     );
  } else if (type.includes("HomeArticle")) {
    singleCardContent = (
      <Card className="articleCard">
        <CardMedia
          component="img"
          height="200px"
          image={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
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
          image={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
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

  return <div onClick={changePageHandle}>{singleCardContent}</div>;
};

export default SingleCard;
