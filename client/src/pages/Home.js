import React, { Fragment, useEffect, useState, useRef } from "react";
import { Button, Box, Typography } from "@mui/material";
import Carousel from "../components/Carousel.js";
import SingleCard from "../components/SingleCard.js";
import HomeSection from "../components/HomeSection.js";
import FeedbackBox from "../components/FeedbackBox.js";
import { slides } from "../data/Carousel.js";
import Line from "../components/Line";
import image from "../assets/Asset1.png";
import { fetchUsers } from "../services/UserService"; // Import user service
import { fetchHomePageClasses } from "../services/ClassService.js";
import { fetchHomePageArticles } from "../services/ArticleService.js";
import { fetchHomePageCounselors } from "../services/CounselorService.js";
import { fetchIndividualCounselings } from "../services/ServiceTypeService.js";
import { fetchHomePageFeedbacks } from "../services/ServiceTypeFeedbackService.js";
import "./Home.css";

const Home = () => {
  // useState to create variable and 'set' is used to assign the variable's value
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [articles, setArticles] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypeFeedbacks, setServiceTypeFeedbacks] = useState([]);

  const dropdownRef = useRef(null); // Reference to the dropdown
  const [isQuestionOneOpen, setIsQuestionOneOpen] = useState(false);
  const [isQuestionTwoOpen, setIsQuestionTwoOpen] = useState(false);
  const [isQuestionThreeOpen, setIsQuestionThreeOpen] = useState(false);
  const [isQuestionFourOpen, setIsQuestionFourOpen] = useState(false);
  const [isQuestionFiveOpen, setIsQuestionFiveOpen] = useState(false);

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

  const toggleQuestionOne = () => {
    setIsQuestionOneOpen(!isQuestionOneOpen);
  };

  const toggleQuestionTwo = () => {
    setIsQuestionTwoOpen(!isQuestionTwoOpen);
  };

  const toggleQuestionThree = () => {
    setIsQuestionThreeOpen(!isQuestionThreeOpen);
  };

  const toggleQuestionFour = () => {
    setIsQuestionFourOpen(!isQuestionFourOpen);
  };

  const toggleQuestionFive = () => {
    setIsQuestionFiveOpen(!isQuestionFiveOpen);
  };

  // useEffect is for handling side effects like fetching data, subscriptions, timers, etc.
  // It’s designed to run after the initial render and is triggered only once in this case
  // (because of the empty dependency array [])
  useEffect(() => {
    getUsers();
    getHomePageClasses();
    getHomePageArticles();
    getHomePageCounselors();
    getIndividualCounselings();
    getHomePageFeedbacks();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Fragment>
      <div className="carousels">
        <Carousel data={slides} />
      </div>
      <HomeSection
        title="Konseling dengan Psikolog Tersertifikasi!"
        subTitle="Pilih layanan konseling sesuai dengan kebutuhanmu!"
        columns={4}>
        {serviceTypes.map((serviceType) => (
          <SingleCard key={serviceType.serviceTypeId} type={serviceType.itemType} data={serviceType} />
        ))}
        {/* {serviceTypeFeedbacks.map((serviceTypeFeedback) => (
            <FeedbackBox key={serviceTypeFeedback.serviceTypeFeedbackId} data={serviceTypeFeedback} />
          ))} */}
      </HomeSection>

      {
        // <div className="homeWrapper">
        //   <Typography variant="h4">Konseling dengan Psikolog Tersertifikasi!</Typography>
        //   <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
        //     Pilih layanan konseling sesuai dengan kebutuhanmu!
        //   </Typography>
        //   <Box
        //     sx={{
        //       display: "grid",
        //       gridTemplateColumns: "repeat(4, 1fr)",
        //       gap: 3,
        //     }}
        //   >
        //     {/* {serviceTypes.map((serviceType) => (
        //     <SingleCard key={serviceType.serviceTypeId} type={serviceType.itemType} data={serviceType} />
        //   ))} */}
        //     {/* {serviceTypeFeedbacks.map((serviceTypeFeedback) => (
        //     <FeedbackBox key={serviceTypeFeedback.serviceTypeFeedbackId} data={serviceTypeFeedback} />
        //   ))} */}
        //   </Box>
        // </div>
      }
      {/* ================================================================================================================== */}
      <HomeSection
        title="Kata Prendsters yang sudah cobain layanan konseling di prends!"
        subTitle=""
        columns={3}>
        <Box className="feedbackBox">
          <Typography variant="h5" style={{ marginBottom: "10px" }}>Lebih Tenang</Typography>
          <Typography variant="subtitle1">
            Kak, alahmdullilah aku lebih tenang setelah konsul. Terima kasih prends. Aku jadi ngerasa lebih seneng saat ini,
            berasa pikiran tuh ngga buntu gitu kak. Kalau aku ada masalah, kemungkinan aku konsul lg kak.
            Abisnya bikin happy jd ga mumet gitu. Thanks prends ngga salah aku bayar konsul ke prends.
          </Typography>
        </Box>
        <Box className="feedbackBox">
          <Typography variant="h5" style={{ marginBottom: "10px" }}>Ga Menyangka</Typography>
          <Typography variant="subtitle1">
            Pertama kali dalam pengalaman aku sama psikolog, aku merasa naik level karena dari harus ketemu 2 minggu sekali,
            ke depannya klo agak stabil bisa naik ke 3 minggu sekali. Never thought I’d get to this point in my life, ever.
            Ga pernah kira bisa sestabil ini setelah bertahun” dealing with BPD. Thank you Kak Ivon yg selalu support aku
            dalam berproses!
          </Typography>
        </Box>
        <Box className="feedbackBox">
          <Typography variant="h5" style={{ marginBottom: "10px" }}>It Works.</Typography>
          <Typography variant="subtitle1">
            Aku pernah di kondisi depresi, 3 taun lalu, saking gamau terulangnya, beberapa bulan lalu sampe konsul di
            @prends.id it works.
          </Typography>
        </Box>
        {/* {serviceTypeFeedbacks.map((serviceTypeFeedback) => (
            <FeedbackBox key={serviceTypeFeedback.serviceTypeFeedbackId} data={serviceTypeFeedback} />
          ))} */}
      </HomeSection>
      {/* <div className="homeWrapper">
        <div className="posterContainer">
          <img src={image} alt="Logo" className="posterImage" />
          <Box className="posterText">
            <Typography variant="button">KLEEDEMY</Typography>
            <Typography variant="h4" className="posterTitle">
              talklee 5 : Deep Dive to Your Inner-Child
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              Rp 200.000,00
            </Typography>
            <Button variant="outlined" className="basketBtn">
              Tambahkan ke keranjang
            </Button>
            <Button variant="contained" className="buyBtn">
              Beli sekarang
            </Button>
          </Box>
        </div>
      </div> */}
      <HomeSection
        title="Kembangkan dirimu melalui kelas persembahan prends!"
        subTitle="Kini tersedia kelas rekaman yang bisa kamu akses selamanya!"
        columns={4}>
        {/* {classes.map((class) => (
          <SingleCard key={class.classId} type={class.itemType} data={class} />
        ))} */}
      </HomeSection>
      {
        // <div className="homeWrapper">
        //   <Typography variant="h4">
        //     Kembangkan dirimu melalui kelas persembahan prends!
        //   </Typography>
        //   <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
        //     Kini tersedia kelas rekaman yang bisa kamu akses selamanya!
        //   </Typography>
        //   <Box
        //     sx={{
        //       display: "grid",
        //       gridTemplateColumns: "repeat(4, 1fr)",
        //       gap: 3,
        //     }}
        //   >
        //     {/* <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} /> */}
        //   </Box>
        // </div>
      }
      {/* ================================================================================================================== */}
      <HomeSection
        title="Pilih psikolog sesuai preferensi kamu!"
        subTitle="Sebelum konseling, kamu bisa mengenal psikolog kamu terlebih dahulu lewat profil mereka!"
        columns={4}>
        {/* {counselors.map((counselor) => (
          <SingleCard key={counselor.counselorId} type={counselor.itemType} data={counselor} />
        ))} */}
      </HomeSection>
      <div className="viewAllWrapper">
        <button className="viewAllBtn">
          Lihat semua
        </button>
      </div>
      {
        // <div className="homeWrapper">
        //   <Typography variant="h4">Kamu udah punya ini belum?</Typography>
        //   <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
        //     Produk-produk untuk mengembangkan dan mengenal diri kamu lebih dalam!
        //   </Typography>
        //   <Box
        //     sx={{
        //       display: "grid",
        //       gridTemplateColumns: "repeat(3, 1fr)",
        //       gap: 3,
        //     }}
        //   >
        //     {/* {users.slice(0, 3).map( //will only show up 1-3 datas, only if the length of data exists
        //       (user) => (
        //         <SingleCard key={user.userId} id={user.userId} type={"counseling"} />
        //       )
        //     )} */}
        //     {/* <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} /> */}
        //   </Box>
        // </div>
      }
      {
        // <div className="homeWrapper">
        //   <Typography variant="h4">
        //     Pilih KLEEXPERT yang sesuai untukmu!
        //   </Typography>
        //   <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
        //     Produk-produk untuk mengembangkan dan mengenal diri kamu lebih dalam!
        //   </Typography>
        //   <Box
        //     sx={{
        //       display: "grid",
        //       gridTemplateColumns: "repeat(3, 1fr)",
        //       gap: 3,
        //     }}
        //   >
        //     {/* <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} /> */}
        //   </Box>
        // </div>
      }
      <HomeSection
        title="Baca artikel terbaru dari #Prendsight!"
        subTitle=""
        columns={3}>
        {/* {articles.map((article) => (
          <SingleCard key={article.articleId} type="homeArticle" data={article} />
        ))} */}
      </HomeSection>
      {
        // <div className="homeWrapper">
        //   <Typography variant="h4">
        //     Baca artikel terbaru dari #Prendsight!
        //   </Typography>
        //   <Box
        //     sx={{
        //       display: "grid",
        //       gridTemplateColumns: "repeat(3, 1fr)",
        //       gap: 3,
        //     }}
        //   >
        //     {/* <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} />
        //     <SingleCard id={82} type={"counseling"} /> */}
        //   </Box>
        // </div>
      }
      <Line />
      <div className="qnaWrapper">
        <Typography variant="h5">
          Beberapa pertanyaan Prendsters seputar layanan prends!
        </Typography>
        {/* <li
          className={`dropdown ${activeLink === "/services" ? "active" : ""}`}
          onClick={() => {
            toggleExpertMenu();
            handleLinkClick("/services");
          }}
          ref={dropdownRef}
        >
          KLEEXPERT
          {isExpertOpen ? (
            <>
              <RxChevronUp className="menuIcon" />
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/services/topic9"
                    onClick={() => handleLinkClick("/services/topic9")}
                  >
                    Junior KLEEXPERT
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic10"
                    onClick={() => handleLinkClick("/services/topic10")}
                  >
                    Middle KLEEXPERT
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic11"
                    onClick={() => handleLinkClick("/services/topic11")}
                  >
                    Senior KLEEXPERT
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="menuIcon" />
          )}
        </li> */}
      </div>
    </Fragment>
  );
};

export default Home;
