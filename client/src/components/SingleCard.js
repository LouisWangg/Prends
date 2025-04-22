import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./SingleCard.css";
import { cards } from "../data/Cards"; // Importing the card data

export const SingleCard = ({ id }) => {
  const singleCard = cards.find((singleCard) => singleCard.id === id);

  return (
    <Card className="singleCard">
      <CardMedia
        component="img"
        image={singleCard.image}
        alt={cards.title}
        className="singleCardImage"
      />
      <CardContent sx={{textAlign: "center"}}>
        <Typography variant="subtitle1" sx={{ marginBottom: "5px" }}>
          {singleCard.title}
        </Typography>
        <Typography variant="caption" className="singleCardPrice">
          {singleCard.date}
        </Typography>
      </CardContent>
    </Card>
  );
};
