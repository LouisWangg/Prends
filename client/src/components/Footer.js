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
        <div className="left">
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
            >
              0851-7202-0718
            </Link>
          </p>
          <p>Email : customercare.klee@gmail.com</p>

          <h6 style={{ marginTop: "30px", marginBottom: "8px" }}>Info Kerja Sama</h6>
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
        <div className="right">
          <h4>Perhatian :</h4>
          <p style={{ marginTop: "18px", marginBottom: "8px" }}>
            Layanan konseling di Klee <b>tidak direkomendasikan</b> untuk kamu
            yang dalam kondisi terancam. Hubungi <b>119</b> jika kamu butuh
            pertolongan sesegera mungkin.
          </p>
        </div>
      </div>
      <div style={{ marginBottom: "30px", padding: "20px 5%" }}>
        <h4>Bergabung ke update dan info terbaru dari Klee!</h4>
        <div className="socialMedias">
          <div className="left">
            <input placeholder="Email" style={{width: "400px"}} />
            <button>
              <RxChevronRight />
            </button>
          </div>
          <div
            className="right"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* <a
              href="https://www.facebook.com/klee.indonesia/?_rdc=1&_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="rightIcon" />
            </a> */}
            <a
              href="https://www.instagram.com/prends.id/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="rightIcon" />
            </a>
            <a
              href="https://www.youtube.com/@prendsindonesia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="rightIcon" />
            </a>
            <a
              href="https://www.tiktok.com/@prends.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="rightIcon" />
            </a>
            <a
              href="https://x.com/prendstwt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="rightIcon" />
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
            Klee.id
          </Link>
        </small>
      </div>
    </Fragment>
  );
};

export default Footer;
