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

  const toggleServiceMenu = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const toggleExpertMenu = () => {
    setIsExpertOpen(!isExpertOpen);
  };

  const toggleClassMenu = () => {
    setIsClassOpen(!isClassOpen);
  };

  const handleLinkClick = (path) => {
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
        <img src={logo} alt="logo" width={100} height={70} />
        <ul className="navbarListPage">
          <li
            className={`navbarLink ${activeLink === "/" ? "navbarLinkActive" : ""}`}
            onClick={() => handleLinkClick("/")}
          >
            <Link to="/">Beranda</Link>
          </li>
          <li
            className={`navbarLink ${activeLink === "/article" ? "navbarLinkActive" : ""}`}
            onClick={() => handleLinkClick("/article")}
          >
            <Link to="/article">Artikel</Link>
          </li>
          <li
            className={`dropdown navbarLink ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
            onClick={() => {
              toggleServiceMenu();
              handleLinkClick("/services");
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
                      onClick={() => handleLinkClick("/services/topic1")}
                    >
                      Konseling Individu
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic2"
                      onClick={() => handleLinkClick("/services/topic2")}
                    >
                      Konseling Pasangan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic3"
                      onClick={() => handleLinkClick("/services/topic3")}
                    >
                      Konseling Keluarga
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic4"
                      onClick={() => handleLinkClick("/services/topic4")}
                    >
                      Assessment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic5"
                      onClick={() => handleLinkClick("/services/topic5")}
                    >
                      Therapy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic6"
                      onClick={() => handleLinkClick("/services/topic6")}
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
            className={`dropdown navbarLink ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
            onClick={() => {
              toggleExpertMenu();
              handleLinkClick("/services");
            }}
          >
            KLEEXPERT
            {isExpertOpen ? (
              <>
                <RxChevronUp className="navbarLinkIcon" />
                <ul className="dropdownMenu">
                  <li>
                    <Link
                      to="/services/topic9"
                      onClick={() => handleLinkClick("/services/topic9")}
                    >
                      Junior KLEEXPERT
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic10"
                      onClick={() => handleLinkClick("/services/topic10")}
                    >
                      Middle KLEEXPERT
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic11"
                      onClick={() => handleLinkClick("/services/topic11")}
                    >
                      Senior KLEEXPERT
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <RxChevronDown className="navbarLinkIcon" />
            )}
          </li>
          <li
            className={`dropdown navbarLink ${activeLink === "/services" ? "navbarLinkActive" : ""}`}
            onClick={() => {
              toggleClassMenu();
              handleLinkClick("/services");
            }}
          >
            KLEEDEMY
            {isClassOpen ? (
              <>
                <RxChevronUp className="navbarLinkIcon" />
                <ul className="dropdownMenu">
                  <li>
                    <Link
                      to="/services/topic7"
                      onClick={() => handleLinkClick("/services/topic7")}
                    >
                      Kelas Mendatang
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services/topic8"
                      onClick={() => handleLinkClick("/services/topic8")}
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
          <li
            className={`navbarLink ${activeLink === "/kleemart" ? "navbarLinkActive" : ""}`}
            onClick={() => handleLinkClick("/kleemart")}
          >
            <Link to="/kleemart">KLEEMART</Link>
          </li>
          <li
            className={`navbarLink ${activeLink === "/aboutUs" ? "navbarLinkActive" : ""}`}
            onClick={() => handleLinkClick("/aboutUs")}
          >
            <Link to="/aboutUs">Tentang Kami</Link>
          </li>
          <li
            onClick={(event) => {
              event.preventDefault();
              window.open(
                "https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0",
                "_blank",
                "noopener, noreferrer"
              );
            }}
          >
            <span className="navbarLink">Bantuan</span>
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
