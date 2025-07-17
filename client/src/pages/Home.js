import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Line from "../components/Line";
import Carousel from "../components/Carousel.js";
import SingleCard from "../components/SingleCard.js";
import HomeSection from "../components/HomeSection.js";
import CommentBox from "../components/CommentBox.js";
import QnaSection from "../components/QnaSection.js";

import { fetchHomePageQnas } from "../services/QnaService";
import { fetchHomePageClasses } from "../services/ClassService.js";
import { fetchHomePageArticles } from "../services/ArticleService.js";
import { fetchCounselors } from "../services/CounselorService.js";
import { fetchServiceTypes } from "../services/ServiceTypeService.js";
import { fetchHomePageComments } from "../services/ServiceTypeCommentService.js";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // useState to create variable and 'set' is used to assign the variable's value
  const [slides, setSlides] = useState([]);
  const [qnas, setQnas] = useState([]);
  const [classes, setClasses] = useState([]);
  const [articles, setArticles] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypeComments, setServiceTypeComments] = useState([]);

  const getCarouselData = async () => {
  try {
    const res = await fetch("/data/Carousel.json");
    const data = await res.json();
    setSlides(data);
  } catch (err) {
    console.error("Failed to fetch carousel data:", err);
  }
};

  const getHomePageClasses = async () => {
    const datas = await fetchHomePageClasses();
    setClasses(datas);
  };

  const getHomePageArticles = async () => {
    const datas = await fetchHomePageArticles();
    setArticles(datas);
  };

  const getHomePageCounselors = async () => {
    const datas = await fetchCounselors({ limit: 4 });
    setCounselors(datas);
  };

  const getHomePageServiceTypes = async () => {
    const datas = await fetchServiceTypes({ itemType: "individual" });
    setServiceTypes(datas);
  };

  const getHomePageComments = async () => {
    const datas = await fetchHomePageComments();
    setServiceTypeComments(datas);
  };

  const getQnaData = async () => {
    const datas = await fetchHomePageQnas();
    setQnas(datas);
  };

  // useEffect is for handling side effects like fetching data, subscriptions, timers, etc.
  // It’s designed to run after the initial render and is triggered only once in this case
  // (because of the empty dependency array [])
  useEffect(() => {
    getCarouselData();
    getQnaData();
    getHomePageClasses();
    getHomePageArticles();
    getHomePageComments();
    getHomePageCounselors();
    getHomePageServiceTypes();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Fragment>
      <div className="carousels">
        <Carousel data={slides} />
      </div>
      <HomeSection
        title="Konseling dengan Psikolog Tersertifikasi!"
        subTitle="Pilih layanan konseling sesuai dengan kebutuhanmu!"
        columns={4}
      >
        {serviceTypes.map((serviceType) => (
          <SingleCard
            key={serviceType.serviceTypeId}
            type={serviceType.itemType}
            data={serviceType}
          />
        ))}
      </HomeSection>

      <HomeSection
        title="Kata Prendsters yang sudah cobain layanan konseling di prends!"
        subTitle=""
        columns={3}
      >
        {serviceTypeComments.map((serviceTypeComment) => (
          <CommentBox
            key={serviceTypeComment.serviceTypeCommentId}
            data={serviceTypeComment}
          />
        ))}
      </HomeSection>

      <HomeSection
        title="Kembangkan dirimu melalui kelas persembahan prends!"
        subTitle="Kini tersedia kelas rekaman yang bisa kamu akses selamanya!"
        columns={4}
      >
        {classes.map((singleClass) => (
          <SingleCard
            key={singleClass.classId}
            type={singleClass.itemType}
            data={singleClass}
          />
        ))}
      </HomeSection>

      <HomeSection
        title="Pilih psikolog sesuai preferensi kamu!"
        subTitle="Sebelum konseling, kamu bisa mengenal psikolog kamu terlebih dahulu lewat profil mereka!"
        columns={4}
      >
        {counselors.map((counselor) => (
          <SingleCard
            key={counselor.counselorId}
            type={counselor.itemType}
            data={counselor}
          />
        ))}
        <div className="viewAllWrapper">
          <button className="viewAllBtn" onClick={() => navigate("/list-page/counselor")}>Lihat semua</button>
        </div>
      </HomeSection>

      <HomeSection
        title="Baca artikel terbaru dari #Prendsight!"
        subTitle=""
        columns={3}
      >
        {articles.map((article) => (
          <SingleCard
            key={article.articleId}
            type="HomeArticle"
            data={article}
          />
        ))}
      </HomeSection>

      <Line />
      <QnaSection data={qnas} />
    </Fragment>
  );
};

export default Home;
