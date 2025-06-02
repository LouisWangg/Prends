import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
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

  return (
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
          <Box component="label" className={`detailPageLabel ${duration === 1 ? "durationActive" : ""}`}>
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

          <Box component="label" className={`detailPageLabel ${duration === 2 ? "durationActive" : ""}`}>
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
          <Box component="label" className={`detailPageLabel ${expertLevel === "junior" ? "durationActive" : ""}`}>
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

          <Box component="label" className={`detailPageLabel ${expertLevel === "middle" ? "durationActive" : ""}`}>
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

          <Box component="label" className={`detailPageLabel ${expertLevel === "senior" ? "durationActive" : ""}`}>
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
      </div>
    </div>
  );
};

export default DetailPage;
