import React from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";

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
          <option value="featured">Unggulan</option>
          <option value="name_asc">Berdasarkan abjad (A-Z)</option>
          <option value="name_desc">Berdasarkan abjad (Z-A)</option>
          <option value="price_asc">Berdasarkan harga (rendah ke tinggi)</option>
          <option value="price_desc">Berdasarkan harga (tinggi ke rendah)</option>
        </select>
        <span>bla bla dari 11 produk</span>
      </div>
      {/* <HomeSection
        title=""
        subTitle=""
        columns={4}
      >
        {classes.map((singleClass) => (
          <SingleCard
            key={singleClass.classId}
            type={singleClass.itemType}
            data={singleClass}
          />
        ))}
      </HomeSection> */}
    </div>
  );
};

export default ListPage;
