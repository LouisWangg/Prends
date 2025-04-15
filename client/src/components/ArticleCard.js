import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./ArticleCard.css";

export const ArticleCard = ({ data }) => {
  return (
    <Card className="articleCard">
    <CardMedia
      component="img"
      height="320px"
      image={data.image}
      alt={data.title}
      className="cardImage"
    />
      <CardContent sx={{textAlign: "center"}}>
              <Typography variant="h4" className="cardTitle">
                {data.title}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                {data.date}
              </Typography>
              <Typography variant="body1">{data.description}</Typography>
      </CardContent>
    </Card>
  );
};
