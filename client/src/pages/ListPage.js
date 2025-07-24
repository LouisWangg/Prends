import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import "./ListPage.css";
import SingleCard from "../components/SingleCard";
import HomeSection from "../components/HomeSection";

import { fetchClasses } from "../services/ClassService.js";
import { fetchCounselors } from "../services/CounselorService.js";
import { fetchServiceTypes } from "../services/ServiceTypeService.js";
import { fetchTitlesAndSubtitles } from "../services/SharedDescriptionService.js";

const ListPage = () => {
  const { itemType, subType } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [pageTexts, setPageTexts] = useState(null);
  const [classes, setClasses] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  let quantity = 0;
  const subTypeValue = useMemo(() => {
    if (itemType.includes("service")) {
      return subType.includes("-")
        ? subType?.trim().split("-")[1] ?? null
        : subType ?? null;
    } else if (itemType.includes("counselor")) {
      return subType?.trim().split("-")[0] ?? null;
    } else if (itemType.includes("class")) {
      return subType.includes("-")
        ? subType?.trim().split("-").join(" ") ?? null
        : subType ?? null;
    }

    return null;
  }, [itemType, subType]);

  const handleSortChange = async (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);

    if (itemType.includes("class")) getClasses(newSort);
    if (itemType.includes("counselor")) getCounselors(newSort);
    if (itemType.includes("service")) getServiceTypes(newSort);
  };

  const getClasses = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      const datas = await fetchClasses({ sortBy: sort });
      setClasses(datas);
      setIsLoading(false);
    }, [sortOption]
  );

  const getCounselors = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      const datas = await fetchCounselors({ subType: subTypeValue, sortBy: sort });
      setCounselors(datas);
      setIsLoading(false);
    }, [subTypeValue, sortOption]
  );

  const getServiceTypes = useCallback(
    async (sort = sortOption) => {
      setIsLoading(true);
      const datas = await fetchServiceTypes({ subType: subTypeValue, sortBy: sort });
      setServiceTypes(datas);
      setIsLoading(false);
    }, [subTypeValue, sortOption]
  );

  useEffect(() => {
    const getTitlesAndSubtitles = async () => {
      const datas = await fetchTitlesAndSubtitles(itemType, subTypeValue);
      setPageTexts(datas);
    };

    if (itemType.includes("class")) getClasses();
    if (itemType.includes("counselor")) getCounselors();
    if (itemType.includes("service")) getServiceTypes();
    getTitlesAndSubtitles();
  }, [itemType, subTypeValue, getClasses, getCounselors, getServiceTypes]);

  const pageTitle = pageTexts?.title ?? (itemType.includes("counselor") ? "Expert" : "");
  const pageSubtitle = pageTexts?.description ?? "";

  const renderDescription = () => {
    if (pageSubtitle?.trim()) {
      return (
        <Typography variant="body1" className="listPageDescription" dangerouslySetInnerHTML={{ __html: pageSubtitle }} />
      );
    }
  };

  const renderSingleCard = () => {
    if (itemType.includes("service")) {
      return serviceTypes.map((serviceType) => (
        <SingleCard
          key={serviceType.serviceTypeId}
          itemType={serviceType.itemType}
          data={serviceType}
        />
      ));
    } else if (itemType.includes("counselor")) {
      return counselors.map((counselor) => (
        <SingleCard
          key={counselor.counselorId}
          itemType={counselor.itemType}
          data={counselor}
        />
      ));
    } else if (itemType.includes("class")) {
      return classes.map((singleClass) => (
        <SingleCard
          key={singleClass.classId}
          itemType={singleClass.itemType}
          data={singleClass}
        />
      ));
    }
  };

  const renderFilter = () => {
    if (itemType.includes("counselor")) {
      quantity = counselors.length;
    } else if (itemType.includes("service")) {
      quantity = serviceTypes.length;
    } else if (itemType.includes("class")) {
      quantity = classes.length;
    }

    return (
      <div className="filterWrapper">
        <span>Urutkan berdasarkan : </span>
        <select onChange={handleSortChange}>
          <option value="default">Unggulan</option>
          {!itemType.includes("class") && (
            <option value="commentCount">Produk Terlaris</option>
          )}
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
      <Typography variant="h3" className="listPageTitle" style={{ paddingTop: "25px" }}>
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
