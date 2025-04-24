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

export const SingleCard = ({ id, type }) => {
    const singleCard = cards.find((singleCard) => singleCard.id === id);

    if (type === "article") {
        return (
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
    } else {
        return (
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
    }
};
