import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";

import { fetchCounselors } from "../services/CounselorService.js";
import { fetchTitlesAndSubtitles } from "../services/SharedDescriptionService.js";

const ListPage = () => {
  const { type, itemType } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [pageTexts, setPageTexts] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [sortOption, setSortOption] = useState("commentCount");

  let itemTypeValue, pageTitle, pageSubtitle;

  const handleSortChange = async (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    getCounselors(newSort);
  };

  const getCounselors = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      const datas = await fetchCounselors({ sortBy: sort });
      setCounselors(datas);
      setIsLoading(false);
    }, [sortOption]
  );

  useEffect(() => {
    const getTitlesAndSubtitles = async () => {
      console.log("SATU = " + type);
      console.log("DUA = " + itemTypeValue)
      const datas = await fetchTitlesAndSubtitles(type, itemTypeValue);
      setPageTexts(datas);

      if (type.includes("service")) {
      } else if (type.includes("class")) {
      } else if (type.includes("counselor")) {
        itemTypeValue = itemType?.split('-')[0];
        pageTitle = pageTexts?.title ?? "Expert";
        pageSubtitle = pageTexts?.description ?? "";
        // if (itemType === undefined) {
        //   pageTitle = "Expert";
        //   pageSubtitle = "";
        // } else {
        //   pageTitle = pageTexts.title;
        //   pageSubtitle = pageTexts.description;
        //   console.log("TITLE = " + pageTitle);
        //   console.log("SUB = " + pageSubtitle);
        // }
      }
    };

    getCounselors();
    getTitlesAndSubtitles();
  }, [type, itemTypeValue, getCounselors]);



  const renderDescription = () => {
    if (pageSubtitle !== null && pageSubtitle !== "") {
      return (
        <Typography variant="body1" className="listPageDescription">
          {pageSubtitle}
        </Typography>
      );
    }
  };

  const renderFilter = () => {
    let quantity;
    if (type.includes("counselor")) {
      quantity = counselors.length;
    }

    return (
      <div className="filterWrapper">
        <span>Urutkan berdasarkan : </span>
        <select onChange={handleSortChange}>
          <option value="commentCount">Unggulan</option>
          <option value="name_asc">Berdasarkan abjad (A-Z)</option>
          <option value="name_desc">Berdasarkan abjad (Z-A)</option>
          <option value="price_asc">
            Berdasarkan harga (rendah ke tinggi)
          </option>
          <option value="price_desc">
            Berdasarkan harga (tinggi ke rendah)
          </option>
        </select>
        <span>{quantity} produk</span>
      </div>
    );
  };

  return (
    <div className="pageWrapper">
      <Typography variant="h3" className="listPageTitle">
        {pageTitle}
      </Typography>

      {renderDescription()}

      {renderFilter()}

      {isLoading ? (
        <div className="loader">Memuat data...</div>
      ) : (
        <div className="fadeIn">
          <HomeSection
            title=""
            subTitle=""
            columns={4}
            noWrapper
            style={{ margin: 0 }}
          >
            {counselors.map((counselor) => (
              <SingleCard
                key={counselor.classId}
                type={counselor.itemType}
                data={counselor}
              />
            ))}
          </HomeSection>
        </div>
      )}
    </div>
  );
};

export default ListPage;
