import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { RxChevronRight } from "react-icons/rx";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaRegCopyright,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

const Footer = () => {
  const openNewTab = (event) => {
    event.preventDefault();
    window.open(
      event.currentTarget.getAttribute("url"),
      "_blank",
      "noopener, noreferrer"
    );
  };

  return (
    <Fragment>
      <div className="footerContainer">
        <div className="left setMargin">
          <h4>Butuh Bantuan?</h4>
          <p style={{ marginTop: "30px", marginBottom: "8px" }}>
            Hubungi Customer Service kami di :{" "}
          </p>
          <p style={{ marginBottom: "8px" }}>
            WhatsApp :{" "}
            <Link
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  "https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0",
                  "_blank",
                  "noopener, noreferrer"
                );
              }}
            >
              0851-7202-0718
            </Link>
          </p>
          <p>Email : customercare.klee@gmail.com</p>

          <h6 style={{ marginTop: "30px" }}>Info Kerja Sama</h6>
          <p style={{ marginBottom: "8px" }}>
            WhatsApp :{" "}
            <Link
              onClick={(event) => {
                event.preventDefault();
                window.open(
                  "https://api.whatsapp.com/send/?phone=6285158883689&text&type=phone_number&app_absent=0",
                  "_blank",
                  "noopener, noreferrer"
                );
              }}
            >
              0851-5888-3689
            </Link>
          </p>
          <p>Email : partnership.klee@gmail.com</p>
        </div>
        <div className="right" style={{ marginTop: "20px" }}>
          <h4>Perhatian :</h4>
          <p>
            Layanan konseling di Klee <b>tidak direkomendasikan</b> untuk kamu
            yang dalam kondisi terancam. Hubungi <b>119</b> jika kamu butuh
            pertolongan sesegera mungkin.
          </p>
        </div>
      </div>
      <div className="setMargin" style={{ marginBottom: "30px" }}>
        <h4>Bergabung ke update dan info terbaru dari Klee!</h4>
        <div className="socialMedias">
          <div className="left">
            <input placeholder="Email" />
            <button>
              <RxChevronRight />
            </button>
          </div>
          <div
            className="right"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button
              onClick={(event) => openNewTab(event)}
              url="https://www.facebook.com/klee.indonesia/?_rdc=1&_rdr"
            >
              <FaFacebook className="rightIcon" />
            </button>
            <button
              onClick={(event) => openNewTab(event)}
              url="https://www.instagram.com/klee.id/"
            >
              <FaInstagram className="rightIcon" />
            </button>
            <button
              onClick={(event) => openNewTab(event)}
              url="https://www.youtube.com/kleeindonesia"
            >
              <FaYoutube className="rightIcon" />
            </button>
            <button
              onClick={(event) => openNewTab(event)}
              url="https://www.tiktok.com/@klee.id"
            >
              <FaTiktok className="rightIcon" />
            </button>
            <button
              onClick={(event) => openNewTab(event)}
              url="https://x.com/klee_id"
            >
              <FaXTwitter className="rightIcon" />
            </button>
          </div>
        </div>
      </div>
      <hr
        style={{
          color: "grey",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
      <div className="footerLinkContainer">
        <FaRegCopyright size={10} />
        <small>
          2025,{" "}
          <Link to="/" className="footerLinkText">
            Klee.id
          </Link>
        </small>
      </div>
    </Fragment>
  );
};

export default Footer;
