import React, { Fragment } from "react";
import { Button, Box, Typography } from "@mui/material";
import { Carousel } from "../components/Carousel.js";
import { SingleCard } from "../components/SingleCard.js";
import { slides } from "../data/Carousel.js";
import Line from "../components/Line";
import image from "../assets/Asset1.png";
import "./Home.css";

const Home = () => {
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
        </Box>
      </div>
      <div className="homeDiv">
        <div className="kleedemyPosterContainer">
          <img
            src={image}
            alt="Logo"
            className="kleedemyPosterImage"
          />
          <Box className="kleedemyPosterText">
            <Typography variant="button">KLEEDEMY</Typography>
            <Typography variant="h4" className="kleedemyPosterTitle">
              talklee 5 : Deep Dive to Your Inner-Child
            </Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              Rp 200.000,00
            </Typography>
            <Button variant="outlined" className="basketBtn">Tambahkan ke keranjang</Button>
            <Button variant="contained" className="buyBtn">Beli sekarang</Button>
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
          <SingleCard id={82} />
          <SingleCard id={82} />
          <SingleCard id={82} />
        </Box>
      </div>
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
