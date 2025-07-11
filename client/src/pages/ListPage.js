import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";

import { fetchCounselors } from "../services/CounselorService.js";

const ListPage = () => {
  const { type, itemType } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [counselors, setCounselors] = useState([]);
  const [sortOption, setSortOption] = useState("commentCount");

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
    },[sortOption]
  );

  let pageTitle, pageDescription;
  if (type.includes("service")) {
  } else if (type.includes("class")) {
  } else if (type.includes("counselor")) {
    if (itemType === undefined) {
      pageTitle = "Expert";
      pageDescription = "";
    } else if (itemType.toLowerCase().includes("junior")) {
      pageTitle = "Junior Expert";
      pageDescription = "";
    } else if (itemType.toLowerCase().includes("middle")) {
      pageTitle = "Middle Expert";
      pageDescription = "";
    } else if (itemType.toLowerCase().includes("expert")) {
      pageTitle = "Senior Expert";
      pageDescription = "";
    }
  }

  useEffect(() => {
    getCounselors();
  }, [getCounselors]);

  const renderDescription = () => {
    if (pageDescription !== null && pageDescription !== "") {
      return (
        <Typography variant="body1" className="listPageDescription">
          {pageDescription}
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
