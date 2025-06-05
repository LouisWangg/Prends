import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FiPlus, FiMinus } from "react-icons/fi";

import "./DetailPage.css";
import image from "../assets/Asset1.png";
import formatToRupiah from "../utils/FormatPrice";
import { fetchServiceDetailById } from "../services/ServiceTypeService";
// import { fetchDescriptions } from "../services/SharedDescriptionService";

const DetailPage = () => {
  const { type, id } = useParams();

  const [duration, setDuration] = useState(1);
  const [expertLevel, setExpertLevel] = useState("junior");
  const [quantity, setQuantity] = useState(1);
  const [descriptions, setDescriptions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({});

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

  // const getDescriptions = async () => {
  //   const datas = await fetchDescriptions(type, id);
  //   setDescriptions(datas);
  // };

  // const getNotices = async () => {
  //   const datas = await fetchDescriptions(type, id);
  //   setNotices(datas);
  // };

  const getServiceDetailById = async (id) => {
    const data = await fetchServiceDetailById(id);
    setServiceDetail(data);
  };

  useEffect(() => {
    // getDescriptions();
    // getNotices();
    getServiceDetailById(id);
  }, []);

  return (
    <Fragment>
      <div className="detailPageWrapper">
        <div className="detailPageImage">
          <img src={image} alt="Product" />
        </div>
        <div className="detailPageContent">
          <Typography variant="body1">prends</Typography>
          <Typography variant="h3" className="detailPageTitle">{serviceDetail.name}</Typography>
          <Typography variant="h6">{formatToRupiah(serviceDetail.discountPrice)}</Typography>

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
          


          <div>
            <b>Perhatian :</b>
            <ol className="detailPageNoticeOrderedList">
              {descriptions.map((description, index) => (
                <Fragment>
                  <li key={description.sharedDescriptionId}>{
                    <span dangerouslySetInnerHTML={{ __html: description.description }} />}
                  </li>

                  {/* Inject after second item (index 1) */}
                  {index === 1 && (
                    <li>
                      {serviceDetail.description}
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
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
