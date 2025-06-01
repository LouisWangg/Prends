import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./DetailPage.css";
import image from "../assets/Asset1.png";

const DetailPage = () => {
  const [duration, setDuration] = useState(1);
  const [expertLevel, setExpertLevel] = useState("junior");
  const [quantity, setQuantity] = useState(1);

  const handleExpertLevelChange = (event) => {
    setExpertLevel(event.target.value);
  };

  return (
    <Fragment>
      <div className="detailPageWrapper">
        <div className="detailPageImage">
          <img src={image} alt="Product" />
        </div>
        <div className="detailPageContent">
          <Typography variant="body1">prends</Typography>
          <Typography variant="h3">Konseling Online Chat Individual</Typography>
          <Typography variant="h6">Rp 200.000,00</Typography>
          <fieldset className="counselingDurationWrapper">
            <legend className="detailPageLegend">Durasi Konseling</legend>
            <Box component="label" className="detailPageLabel">
              <input
                type="radio"
                name="expertLevel"
                value="junior"
                checked={expertLevel === "junior"}
                onChange={handleExpertLevelChange}
                style={{ marginRight: 8 }}
                className="detailPageRadio"
              />
              1 jam
            </Box>

            <Box
              component="label"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                mb: 1,
                px: 1,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              <input
                type="radio"
                name="expertLevel"
                value="middle"
                checked={expertLevel === "middle"}
                onChange={handleExpertLevelChange}
                style={{ marginRight: 8 }}
              />
              2 jam
            </Box>
          </fieldset>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailPage;
