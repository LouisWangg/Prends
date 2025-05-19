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

const SingleCard = ({ id, type, data }) => {
    let singleCardContent;
    // const singleCard = data;
    const singleCard = cards.find((singleCard) => singleCard.id === id);

    const changePageHandle = () => {
        if (type.includes("counseling") || type.includes("class")) {
            // pindah page detail sesuai type
        } else if (type.includes("level")) {
            
        } else if (type.includes("article")) {

        }
    };

    if (type.includes("counseling") || type.includes("class")) {
        singleCardContent = (
            <Card className="singleCard">
                <CardMedia
                    component="img"
                    image={singleCard.image}
                    alt={singleCard.title}
                    className="singleCardImage"
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                        {singleCard.title}
                    </Typography>
                    <Typography variant="caption" className="singleCardPrice">
                        {singleCard.date}
                    </Typography>
                </CardContent>
            </Card>
        );
    } else if (type.includes("level")) {
        singleCardContent = (
            <Card className="singleCard">
                <CardMedia
                    component="img"
                    image={singleCard.image}
                    alt={singleCard.title}
                    className="singleCardImage"
                />
                <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
                        {singleCard.title}
                    </Typography>
                    <Typography variant="caption" className="singleCardPrice">
                        {singleCard.date}
                    </Typography>
                </CardContent>
            </Card>
        );
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
