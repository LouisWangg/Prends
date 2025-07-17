import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";

import { fetchCounselors } from "../services/CounselorService.js";
import { fetchServiceTypes } from "../services/ServiceTypeService.js";
import { fetchTitlesAndSubtitles } from "../services/SharedDescriptionService.js";

const ListPage = () => {
  const { type, itemType } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [pageTexts, setPageTexts] = useState(null);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [sortOption, setSortOption] = useState("commentCount");

  let quantity = 0;
  const itemTypeValue = useMemo(() => {
    if (type.includes("service")) {
      return itemType.includes("-")
        ? itemType?.trim().split("-")[1] ?? null
        : itemType ?? null;
    } else if (type.includes("counselor")) {
      return itemType?.trim().split("-")[0] ?? null;
    } else if (type.includes("class")) {
      return itemType.includes("-")
        ? itemType?.trim().split("-").join(" ") ?? null
        : itemType ?? null;
    }

    return null;
  }, [type, itemType]);

  const handleSortChange = async (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    getCounselors(newSort);
  };

  const getCounselors = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      const datas = await fetchCounselors({ itemType: itemTypeValue, sortBy: sort });
      setCounselors(datas);
      setIsLoading(false);
    }, [itemTypeValue, sortOption]
  );

  const getServiceTypes = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      console.log("IT FE = " + itemTypeValue);
      console.log("IT FE 2 = " + itemType);
      const datas = await fetchServiceTypes({ itemType: itemTypeValue, sortBy: sort });
      setServiceTypes(datas);
      setIsLoading(false);
    }, [itemTypeValue, sortOption]
  );

  useEffect(() => {
    const getTitlesAndSubtitles = async () => {
      const datas = await fetchTitlesAndSubtitles(type, itemTypeValue);
      setPageTexts(datas);
    };

    if (type.includes("counselor")) getCounselors();
    if (type.includes("service")) getServiceTypes();
    getTitlesAndSubtitles();
  }, [type, itemTypeValue, getCounselors, getServiceTypes]);

  const pageTitle = pageTexts?.title ?? (type.includes("counselor") ? "Expert" : "");
  const pageSubtitle = pageTexts?.description ?? "";

  const renderDescription = () => {
    if (pageSubtitle?.trim()) {
      return (
        <Typography variant="body1" className="listPageDescription" dangerouslySetInnerHTML={{ __html: pageSubtitle }} />
      );
    }
  };

  const renderSingleCard = () => {
    if (type.includes("service")) {
      return serviceTypes.map((serviceType) => (
        <SingleCard
          key={serviceType.serviceTypeId}
          type={serviceType.itemType}
          data={serviceType}
        />
      ));
    } else if (type.includes("counselor")) {
      return counselors.map((counselor) => (
        <SingleCard
          key={counselor.counselorId}
          type={counselor.itemType}
          data={counselor}
        />
      ));
    }
  };

  const renderFilter = () => {
    if (type.includes("counselor")) {
      quantity = counselors.length;
    } else if (type.includes("service")) {
      quantity = serviceTypes.length;
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
      ) : quantity === 0 ? (
        <div className="noDataWrapper">
          <Typography variant="h4">
            Tidak ada produk yang ditemukan <br /> Gunakan lebih sedikit filter atau hapus semua
          </Typography>
        </div>
      ) : (
        <div className="fadeIn">
          <HomeSection
            title=""
            subTitle=""
            columns={4}
            noWrapper
            style={{ margin: 0 }}
          >
            {renderSingleCard()}
          </HomeSection>
        </div>
      )}
    </div>
  );
};

export default ListPage;
