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

  const handleChangePage = () => {
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
    // } else if (type.includes("Level")) {
    //     singleCardContent = (
    //         <Card className="singleCard">
    //             <CardMedia
    //                 component="img"
    //                 src={singleCard.image}
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

  return <div onClick={handleChangePage}>{singleCardContent}</div>;
};

export default SingleCard;
