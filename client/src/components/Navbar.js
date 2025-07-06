import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";

import "./Navbar.css";
import logo from "../assets/Logo.png";

const Navbar = ({ isSticky }) => {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleServiceMenuToggle = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const handleExpertMenuToggle = () => {
    setIsExpertOpen(!isExpertOpen);
  };

  const handleClassMenuToggle = () => {
    setIsClassOpen(!isClassOpen);
  };

  const handleActiveLink = (path) => {
    setActiveLink(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeAllDropdowns = () => {
      setIsServiceOpen(false);
      setIsExpertOpen(false);
      setIsClassOpen(false);
    };
    document.addEventListener("mousedown", closeAllDropdowns);
    return () => document.removeEventListener("mousedown", closeAllDropdowns);
  }, []);

  return (
    <div className={`navbarWrapper ${isSticky ? "sticky" : ""}`}>
      <img src={logo} alt="logo" height={70} />
      <ul className="navbarLists">
        <li
          className={`${activeLink === "/" ? "navbarLinkActive" : ""}`}
          onClick={() => handleActiveLink("/")}
        >
          <Link to="/">Beranda</Link>
        </li>
        <li
          className={`${activeLink === "/article" ? "navbarLinkActive" : ""}`}
          onClick={() => handleActiveLink("/article")}
        >
          <Link to="/article">Artikel</Link>
        </li>
        <li
          className={`dropdown ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
          onClick={() => {
            handleServiceMenuToggle();
            handleActiveLink("/services");
          }}
        >
          Layanan
          {isServiceOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/services/topic1"
                    onClick={() => handleActiveLink("/services/topic1")}
                  >
                    Konseling Individu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic2"
                    onClick={() => handleActiveLink("/services/topic2")}
                  >
                    Konseling Pasangan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic3"
                    onClick={() => handleActiveLink("/services/topic3")}
                  >
                    Konseling Keluarga
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic4"
                    onClick={() => handleActiveLink("/services/topic4")}
                  >
                    Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic5"
                    onClick={() => handleActiveLink("/services/topic5")}
                  >
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic6"
                    onClick={() => handleActiveLink("/services/topic6")}
                  >
                    Wawancara
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="navbarLinkIcon" />
          )}
        </li>
        <li
          className={`dropdown ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
          onClick={() => {
            handleExpertMenuToggle();
            handleActiveLink("/services");
          }}
        >
          Konseling
          {isExpertOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/services/topic9"
                    onClick={() => handleActiveLink("/services/topic9")}
                  >
                    Junior Expert
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic10"
                    onClick={() => handleActiveLink("/services/topic10")}
                  >
                    Middle Expert
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic11"
                    onClick={() => handleActiveLink("/services/topic11")}
                  >
                    Senior Expert
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="navbarLinkIcon" />
          )}
        </li>
        <li
          className={`dropdown ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
          onClick={() => {
            handleClassMenuToggle();
            handleActiveLink("/services");
          }}
        >
          Kelas
          {isClassOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/services/topic7"
                    onClick={() => handleActiveLink("/services/topic7")}
                  >
                    Kelas Mendatang
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services/topic8"
                    onClick={() => handleActiveLink("/services/topic8")}
                  >
                    Rekaman Kelas
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="navbarLinkIcon" />
          )}
        </li>
        {/* <li
            className={`${activeLink === "/kleemart" ? "navbarLinkActive" : ""}`}
            onClick={() => handleActiveLink("/kleemart")}
          >
            <Link to="/kleemart">KLEEMART</Link>
          </li> */}
        <li
          className={`${activeLink === "/aboutUs" ? "navbarLinkActive" : ""}`}
          onClick={() => handleActiveLink("/aboutUs")}
        >
          <Link to="/aboutUs">Tentang Kami</Link>
        </li>
        <li>
          <a
            href="https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bantuan
          </a>
        </li>
      </ul>
      <div className="navbarButtons">
        <button className="navbarButton">
          <SlMagnifier className="navbarIcon" />
        </button>
        <Link className="navbarButton" to="/login">
          <CiUser className="navbarUserIcon" />
        </Link>
        <Link className="navbarButton" to="/login">
          <BsBag className="navbarIcon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
