import React, { Fragment, useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Carousel } from "../components/Carousel.js";
import { SingleCard } from "../components/SingleCard.js";
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
import {
  fetchIndividualCounselings,
  fetchIndividualCounselingById
} from "../services/ServiceTypeService.js"; // Import service type service
import "./Home.css";

const Home = () => {
  // useState to create variable and 'set' is used to assign the variable's value
  const [users, setUsers] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const getUsers = async () => {
    const datas = await fetchUsers();
    setUsers(datas);
  };

  const getUserById = async () => {
    const data = await fetchUserById(1);
  };

  const getServiceTypes = async () => {
    const datas = await fetchIndividualCounselings();
    setServiceTypes(datas);
  };

  const getServiceTypeById = async () => {
    const data = await fetchUserById(1);
  };

  // useEffect is for handling side effects like fetching data, subscriptions, timers, etc.
  // It’s designed to run after the initial render and is triggered only once in this case
  // (because of the empty dependency array [])
  useEffect(() => {
    getUsers();
    getServiceTypes();
    // getUserById();
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
      <div className="homeDiv">
        <Typography variant="h4">Konseling dengan KLEEXPERT!</Typography>
        <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
          Pilih layanan konseling dengan KLEEXPERT sesuai dengan kebutuhanmu!
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {/* {serviceTypes.map((service) => (
            <SingleCard key={service.id} id={service.id} type="counseling" data={service} />
          ))} */}
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
        </Box>
      </div>
      <div className="homeDiv">
        <div className="kleedemyPosterContainer">
          <img src={image} alt="Logo" className="kleedemyPosterImage" />
          <Box className="kleedemyPosterText">
            <Typography variant="button">KLEEDEMY</Typography>
            <Typography variant="h4" className="kleedemyPosterTitle">
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
          Kembangkan dirimu melalui kelas dari KLEEDEMY
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
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
          {users.slice(0, 3).map( //will only show up 1-3 datas, only if the length of data exists
            (user) => (
              <SingleCard key={user.userId} id={user.userId} />
            )
          )}
          {/* <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} /> */}
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
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
