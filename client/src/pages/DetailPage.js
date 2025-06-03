import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./DetailPage.css";
import image from "../assets/Asset1.png";

const DetailPage = () => {
  const [duration, setDuration] = useState(1);
  const [expertLevel, setExpertLevel] = useState("junior");
  const [quantity, setQuantity] = useState(1);

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value, 10));
  };

  const handleExpertLevelChange = (event) => {
    setExpertLevel(event.target.value);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <Fragment>
      <div className="detailPageWrapper">
        <div className="detailPageImage">
          <img src={image} alt="Product" />
        </div>
        <div className="detailPageContent">
          <Typography variant="body1">prends</Typography>
          <Typography variant="h3" className="detailPageTitle">Konseling Online Chat Individual</Typography>
          <Typography variant="h6">Rp 200.000,00</Typography>

          <fieldset className="detailPageFieldSet">
            <legend className="detailPageLegend">Durasi Konseling</legend>
            <Box component="label" className={`detailPageLabel ${duration === 1 ? "activeMode" : ""}`}>
              <input
                type="radio"
                name="duration"
                value="1"
                checked={duration === 1}
                onChange={handleDurationChange}
                className="detailPageRadio"
              />
              1 jam
            </Box>

            <Box component="label" className={`detailPageLabel ${duration === 2 ? "activeMode" : ""}`}>
              <input
                type="radio"
                name="duration"
                value="2"
                checked={duration === 2}
                onChange={handleDurationChange}
                className="detailPageRadio"
              />
              2 jam
            </Box>
          </fieldset>

          <fieldset className="detailPageFieldSet">
            <legend className="detailPageLegend">Expert</legend>
            <Box component="label" className={`detailPageLabel ${expertLevel === "junior" ? "activeMode" : ""}`}>
              <input
                type="radio"
                name="expertLevel"
                value="junior"
                checked={expertLevel === "junior"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Junior Expert
            </Box>

            <Box component="label" className={`detailPageLabel ${expertLevel === "middle" ? "activeMode" : ""}`}>
              <input
                type="radio"
                name="expertLevel"
                value="middle"
                checked={expertLevel === "middle"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Middle Expert
            </Box>

            <Box component="label" className={`detailPageLabel ${expertLevel === "senior" ? "activeMode" : ""}`}>
              <input
                type="radio"
                name="expertLevel"
                value="senior"
                checked={expertLevel === "senior"}
                onChange={handleExpertLevelChange}
                className="detailPageRadio"
              />
              Senior Expert
            </Box>
          </fieldset>

          <div className="quantityWrapper">
            <Typography variant="body2" className="detailPageLegend" sx={{ marginBottom: "8px" }}>Jumlah</Typography>
            <div className="quantityInputWrapper">
              <button onClick={handleDecreaseQuantity} aria-label="Decrease quantity"><FiMinus /></button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                readOnly
              />
              <button onClick={handleIncreaseQuantity} aria-label="Increase quantity"><FiPlus /></button>
            </div>
          </div>

          <div className="transactionButtonWrapper">
            <button className="basketBtn">Tambahkan ke keranjang</button>
            <button className="buyBtn">Beli sekarang</button>
          </div>

          <div style={{marginBottom:"35px"}}>
            <b>Apa itu sesi konseling online individual?</b>
            <p>Dalam sesi indivual, hanya diperkenankan <b>1 orang klien dengan 1 orang psikolog </b>(1 on 1).</p>
          </div>
          <div style={{marginBottom:"35px"}}>
            <b>Apa perbedaan Junior, Middle, dan Senior Expert?</b>
            <p>
              Junior Expert adalah psikolog yang memiliki pengalaman dalam menangani klien di bawah 3 tahun.
              Umumnya berpengalaman dalam menangani kasus remaja, dewasa dengan usia di bawah 25 tahun dan belum
              menikah. Psikolog yang ada di level Junior Expert rata-rata berusia di bawah 30 tahun.
              <br /> <br />
              Middle Expert adalah psikolog yang memiliki pengalaman dalam menangani klien selama lebih dari
              3 tahun. Umumnya berpengalaman dalam menangani kasus anak-anak, remaja, dewasa belum menikah,
              dewasa sudah menikah, pasangan, hingga keluarga. Psikolog yang ada di level Middle Expert rata-rata
              berusia di atas 30 tahun.
              <br /> <br />
              Senior Expert adalah psikolog yang memiliki pengalaman dalam menangani klien selama lebih dari
              8 tahun. Umumnya berpengalaman dalam menangani kasus anak-anak, remaja, dewasa belum menikah,
              dewasa sudah menikah, pasangan, hingga keluarga. Psikolog yang ada di level Senior Expert rata-rata
              berusia di atas 35 tahun.
            </p>
          </div>
          <div>
            <b>Dimana konseling online chat akan berlangsung?</b>
            <p>Konseling chat dilakukan melalui Google Chat.</p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "300px" }}>
        <p>sampaii</p>
      </div>
    </Fragment>
  );
};

export default DetailPage;
