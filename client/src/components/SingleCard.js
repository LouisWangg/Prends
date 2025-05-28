import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import "./SingleCard.css";
import "./ArticleCard.css";
import { cards } from "../data/Cards"; // Importing the card data

const SingleCard = ({ type, data }) => {
    let imageData;
    let singleCardContent;
    const singleCard = data;
    // const singleCard = cards.find((singleCard) => singleCard.id === id);

    if (type.includes("Service")) {
        imageData = singleCard?.ServiceTypeImages?.[0]?.image || null;
    } else if (type.includes("Class")) {
        imageData = singleCard?.image || null;
    } else if (type.includes("Counselor")) {
        imageData = singleCard?.CounselorImages?.[0]?.image || null;
    } else if (type.includes("Article")) {
        imageData = singleCard?.ArticleImage?.image || null;
    }

    const formatToRupiah = (price) => {
        if (typeof price !== "number") return "Rp0,00";
        return (
            "Rp " +
            price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
            ",00"
        );
    };

    const changePageHandle = () => {
        if (type.includes("Counseling") || type.includes("Class")) {
            // pindah page detail sesuai type
        } else if (type.includes("Level")) {

        } else if (type.includes("Article")) {

        }
    };

    if (type.includes("Service") || type.includes("Class") || type.includes("Counselor")) {
        singleCardContent = (
            <Card className="singleCard">
                <div className="singleCardImageWrapper">
                    <CardMedia
                        component="img"
                        image={imageData ? `data:image/jpeg;base64,${imageData}` : ""}
                        alt={singleCard.name}
                        className="singleCardImage"
                    />
                    {singleCard.discountFlag && (
                        <div className="obralBadge">Obral</div>
                    )}
                </div>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "5px", textWrap: "nowrap" }}>
                        {singleCard.name}
                    </Typography>
                    <Typography variant="caption" className="singleCardPrice">
                        {singleCard.discountFlag ? (
                            <>
                                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
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
                    <Typography variant="h4" className="cardTitle">
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
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                        {singleCard.createdAt}
                    </Typography>
                    <Typography variant="body1">{singleCard.subTitle}</Typography>
                </CardContent>
            </Card>
        );
    }

    return <div onClick={changePageHandle}>{singleCardContent}</div>;
};

export default SingleCard;
