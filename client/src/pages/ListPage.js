import React from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";

const ListPage = () => {
  const { type } = useParams();

  let pageTitle, pageDescription;
  if (type.includes("service")) {
  } else if (type.includes("class")) {
  } else if (type.includes("counselor")) {
    pageTitle = "Expert";
    pageDescription = "";
  }

  return (
    <div className="pageWrapper">
      <Typography variant="h3" sx={{ marginTop: "40px" }}>
        {pageTitle}
      </Typography>
      <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
        {pageDescription}
      </Typography>
      <div className="filterWrapper">
          <span>Urutkan berdasarkan : </span>
          <select>
            <option value="high">High Price</option>
            <option value="low">Low Price</option>
          </select>
          <span>bla bla dari 11 produk</span>
      </div>
    </div>
  );
};

export default ListPage;
