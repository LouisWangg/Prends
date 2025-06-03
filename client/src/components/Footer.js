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
  return (
    <Fragment>
      <div className="footerContainer">
        <div className="leftSection">
          <h4>Butuh Bantuan?</h4>
          <p style={{ marginTop: "20px", marginBottom: "8px" }}>
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
              className="footerLink"
            >
              0851-7202-0718
            </Link>
          </p>
          <p>Email : customercare.prends@gmail.com</p>
          <p>Info Kerjasama : prends.indonesia@gmail.com</p>
        </div>

        <div className="rightSection">
          <h4>Perhatian :</h4>
          <p style={{ marginTop: "18px", marginBottom: "8px", textAlign: "justify" }}>
            Layanan konseling di prends <b>tidak direkomendasikan</b> untuk kamu
            yang dalam kondisi terancam. Hubungi <b>119</b> jika kamu butuh
            pertolongan sesegera mungkin.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "30px", padding: "20px 5%" }}>
        <h4>Bergabung ke update dan info terbaru dari prends!</h4>
        <div className="socialMedias">
          <div className="leftSection">
            <div className="emailInputWrapper">
              <input placeholder="Email" style={{ width: "400px" }} />
              <button>
                <RxChevronRight />
              </button>
            </div>
          </div>
          <div
            className="rightSection"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <a
              href="https://www.instagram.com/prends.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
            >
              <FaInstagram className="footerIcon" />
            </a>
            <a
              href="https://www.youtube.com/@prendsindonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
            >
              <FaYoutube className="footerIcon" />
            </a>
            <a
              href="https://www.tiktok.com/@prends.id"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
            >
              <FaTiktok className="footerIcon" />
            </a>
            <a
              href="https://x.com/prendstwt"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
            >
              <FaXTwitter className="footerIcon" />
            </a>
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
            prends
          </Link>
        </small>
      </div>
    </Fragment>
  );
};

export default Footer;
