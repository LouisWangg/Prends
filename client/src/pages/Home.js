import React, { Fragment, useEffect, useState } from "react";
import Line from "../components/Line";
import Carousel from "../components/Carousel.js";
import SingleCard from "../components/SingleCard.js";
import HomeSection from "../components/HomeSection.js";
import FeedbackBox from "../components/FeedbackBox.js";
import QnaSection from "../components/QnaSection.js";
import { slides } from "../data/Carousel.js";
import { fetchUsers } from "../services/UserService";
import { fetchHomePageQnas } from "../services/QnaService";
import { fetchHomePageClasses } from "../services/ClassService.js";
import { fetchHomePageArticles } from "../services/ArticleService.js";
import { fetchHomePageCounselors } from "../services/CounselorService.js";
import { fetchIndividualCounselings } from "../services/ServiceTypeService.js";
import { fetchHomePageFeedbacks } from "../services/ServiceTypeFeedbackService.js";
import "./Home.css";

const Home = () => {
  // useState to create variable and 'set' is used to assign the variable's value
  const [qnas, setQnas] = useState([]);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [articles, setArticles] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypeFeedbacks, setServiceTypeFeedbacks] = useState([]);

  const getUsers = async () => {
    const datas = await fetchUsers();
    setUsers(datas);
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
    const datas = await fetchHomePageCounselors();
    setCounselors(datas);
  };

  const getIndividualCounselings = async () => {
    const datas = await fetchIndividualCounselings();
    setServiceTypes(datas);
  };

  const getHomePageFeedbacks = async () => {
    const datas = await fetchHomePageFeedbacks();
    setServiceTypeFeedbacks(datas);
  };

  const getHomePageQnas = async () => {
    const datas = await fetchHomePageQnas();
    setQnas(datas);
  };

  // useEffect is for handling side effects like fetching data, subscriptions, timers, etc.
  // It’s designed to run after the initial render and is triggered only once in this case
  // (because of the empty dependency array [])
  useEffect(() => {
    getUsers();
    getHomePageQnas();
    getHomePageClasses();
    getHomePageArticles();
    getHomePageFeedbacks();
    getHomePageCounselors();
    getIndividualCounselings();
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
        {serviceTypeFeedbacks.map((serviceTypeFeedback) => (
          <FeedbackBox
            key={serviceTypeFeedback.serviceTypeFeedbackId}
            data={serviceTypeFeedback}
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
          <button className="viewAllBtn">Lihat semua</button>
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
