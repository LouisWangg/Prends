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
    let singleCardContent;
    const singleCard = data;
    // const singleCard = cards.find((singleCard) => singleCard.id === id);

    const formatToRupiah = (price) => {
        if (typeof price !== "number") return "Rp0,00";
        return (
            "Rp " +
            price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
            ",00"
        );
    };

    const changePageHandle = () => {
        if (type.includes("counseling") || type.includes("class")) {
            // pindah page detail sesuai type
        } else if (type.includes("level")) {

        } else if (type.includes("article")) {

        }
    };

    if (type.includes("service") || type.includes("class") || type.includes("counselor")) {
        singleCardContent = (
            <Card className="singleCard">
                <div style={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={`data:image/jpeg;base64,${singleCard.ServiceTypeImages[0].image}`}
                        alt={singleCard.title}
                        className="singleCardImage"
                    />
                    {singleCard.discountFlag && (
                        <div className="obralBadge">Obral</div>
                    )}
                </div>
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                        {singleCard.name}
                    </Typography>
                    <Typography variant="caption" className="singleCardPrice">
                        {singleCard.discountFlag ? (
                            <>
                                <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
                                    {formatToRupiah(singleCard.price)}
                                </span>
                                <span style={{ color: "red", fontWeight: "bold" }}>
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
        // } else if (type.includes("level")) {
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
    } else if (type.includes("article")) {
        singleCardContent = (
            <Card className="articleCard">
                <CardMedia
                    component="img"
                    height="320px"
                    image={singleCard.image}
                    alt={singleCard.title}
                    className="cardImage"
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h4" className="cardTitle">
                        {singleCard.title}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: "10px" }}>
                        {singleCard.date}
                    </Typography>
                    <Typography variant="body1">{singleCard.description}</Typography>
                </CardContent>
            </Card>
        );
    }

    return <div onClick={changePageHandle}>{singleCardContent}</div>;
};

export default SingleCard;
