import React, { Fragment, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import Carousel from "../components/Carousel.js";
import SingleCard from "../components/SingleCard.js";
import HomeSection from "../components/HomeSection.js";
import FeedbackBox from "../components/FeedbackBox.js";
import { slides } from "../data/Carousel.js";
import Line from "../components/Line";
import image from "../assets/Asset1.png";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/UserService"; // Import user service
import { fetchHomePageClasses } from "../services/ClassService.js";
import { fetchHomePageCounselors } from "../services/CounselorService.js";
import { fetchIndividualCounselings } from "../services/ServiceTypeService.js";
import { fetchHomePageFeedbacks } from "../services/ServiceTypeFeedbackService.js";
import "./Home.css";

const Home = () => {
  // useState to create variable and 'set' is used to assign the variable's value
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [serviceTypeFeedbacks, setServiceTypeFeedbacks] = useState([]);

  const getUsers = async () => {
    const datas = await fetchUsers();
    setUsers(datas);
  };

  const getUserById = async () => {
    const data = await fetchUserById(1);
  };

  const getHomePageClasses = async () => {
    const datas = await fetchHomePageClasses();
    setClasses(datas);
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

  // useEffect is for handling side effects like fetching data, subscriptions, timers, etc.
  // It’s designed to run after the initial render and is triggered only once in this case
  // (because of the empty dependency array [])
  useEffect(() => {
    getUsers();
    getHomePageClasses();
    getHomePageCounselors();
    getIndividualCounselings();
    getHomePageFeedbacks();
  }, []); // Empty dependency array ensures this runs only once

  const handleCreate = async () => {
    const newUser = {
      email: "test@example.com",
      password: "123456",
      firstName: "John",
      lastName: "Doe",
    };

    const response = await createUser(newUser);
    console.log("Create response:", response);
    getUsers();
  };

  const handleUpdate = async () => {
    const userId = 1;
    const updatedData = {
      email: "updated@example.com",
      firstName: "Jane",
      lastName: "Smith",
    };

    console.log("users = " + users);

    const response = await updateUser(userId, updatedData);
    console.log("Update response:", response);
    getUsers();
  };

  const handleDelete = async () => {
    const userId = 1;
    const response = await deleteUser(userId);
    console.log("Delete response:", response);
    getUsers();
  };

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
      <div className="homeDiv">
        <Typography variant="h4">Konseling dengan Psikolog Tersertifikasi!</Typography>
        <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
          Pilih layanan konseling sesuai dengan kebutuhanmu!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {serviceTypes.map((serviceType) => (
            <SingleCard key={serviceType.serviceTypeId} type={serviceType.itemType} data={serviceType} />
          ))}
          {/* {serviceTypeFeedbacks.map((serviceTypeFeedback) => (
            <FeedbackBox key={serviceTypeFeedback.serviceTypeFeedbackId} data={serviceTypeFeedback} />
          ))} */}
        </Box>
      </div>
      <div className="homeDiv">
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
      </div>
      <div className="homeDiv">
        <Typography variant="h4">
          Kembangkan dirimu melalui kelas persembahan prends!
        </Typography>
        <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
          Kini tersedia kelas rekaman yang bisa kamu akses selamanya!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {/* <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} /> */}
        </Box>
      </div>
      <div className="homeDiv">
        <Typography variant="h4">Kamu udah punya ini belum?</Typography>
        <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
          Produk-produk untuk mengembangkan dan mengenal diri kamu lebih dalam!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {/* {users.slice(0, 3).map( //will only show up 1-3 datas, only if the length of data exists
            (user) => (
              <SingleCard key={user.userId} id={user.userId} type={"counseling"} />
            )
          )} */}
          {/* <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} /> */}
        </Box>
      </div>
      <button onClick={handleCreate}>Create User</button>
      <button onClick={handleUpdate}>Update User</button>
      <button onClick={handleDelete}>Delete User</button>

      <div className="homeDiv">
        <Typography variant="h4">
          Pilih KLEEXPERT yang sesuai untukmu!
        </Typography>
        <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
          Produk-produk untuk mengembangkan dan mengenal diri kamu lebih dalam!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {/* <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} /> */}
        </Box>
      </div>
      <div className="homeDiv">
        <Typography variant="h4">
          Kata Kleezen yang sudah cobain layanan konseling di Klee!
        </Typography>
        <div style={{ display: "flex" }}>
          <h3>Lebih Tenang</h3>
          <h3 style={{ margin: "0 80px 0 80px" }}>Ga Menyangka</h3>
          <h3>It Works</h3>
        </div>
        {/* <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
        </Box> */}
      </div>
      <div className="homeDiv">
        <Typography variant="h4">
          Baca artikel terbaru dari #Kleexplained!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {/* <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} />
          <SingleCard id={82} type={"counseling"} /> */}
        </Box>
      </div>
      <Line />
      <Typography variant="h5">
        Beberapa pertanyaan Kleezen seputar layanan Klee!
      </Typography>
    </Fragment>
  );
};

export default Home;
