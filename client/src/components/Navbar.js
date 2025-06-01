import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";
import "./Navbar.css";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to the dropdown
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleServiceMenu = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const toggleExpertMenu = () => {
    setIsExpertOpen(!isExpertOpen);
  };

  const toggleAcademyMenu = () => {
    setIsAcademyOpen(!isAcademyOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const changePath = (path) => {
    navigate(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      setIsServiceOpen(false);
      setIsExpertOpen(false);
      setIsAcademyOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <div className="nav">
        <img src={logo} alt="logo" width={100} height={70} />
        <ul>
          <li
            className={activeLink === "/" ? "active" : ""}
            onClick={() => handleLinkClick("/")}
          >
            <Link to="/">Beranda</Link>
          </li>
          <li
            className={activeLink === "/article" ? "active" : ""}
            onClick={() => handleLinkClick("/article")}
          >
            <Link to="/article">Artikel</Link>
          </li>
          <li
            className={`dropdown ${activeLink === "/services" ? "active" : ""}`}
            onClick={() => {
              toggleServiceMenu();
              handleLinkClick("/services");
            }}
            ref={dropdownRef}
          >
            Layanan
            {isServiceOpen ? (
              <>
                <RxChevronUp className="navbarMenuIcon" />
                <ul className="dropdown-menu">
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
              <RxChevronDown className="navbarMenuIcon" />
            )}
          </li>
          <li
            className={`dropdown ${activeLink === "/services" ? "active" : ""}`}
            onClick={() => {
              toggleExpertMenu();
              handleLinkClick("/services");
            }}
            ref={dropdownRef}
          >
            KLEEXPERT
            {isExpertOpen ? (
              <>
                <RxChevronUp className="navbarMenuIcon" />
                <ul className="dropdown-menu">
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
              <RxChevronDown className="navbarMenuIcon" />
            )}
          </li>
          <li
            className={`dropdown ${activeLink === "/services" ? "active" : ""}`}
            onClick={() => {
              toggleAcademyMenu();
              handleLinkClick("/services");
            }}
            ref={dropdownRef}
          >
            KLEEDEMY
            {isAcademyOpen ? (
              <>
                <RxChevronUp className="navbarMenuIcon" />
                <ul className="dropdown-menu">
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
              <RxChevronDown className="navbarMenuIcon" />
            )}
          </li>
          <li
            className={activeLink === "/kleemart" ? "active" : ""}
            onClick={() => handleLinkClick("/kleemart")}
          >
            <Link to="/kleemart">KLEEMART</Link>
          </li>
          <li
            className={activeLink === "/aboutUs" ? "active" : ""}
            onClick={() => handleLinkClick("/aboutUs")}
          >
            <Link to="/aboutUs">Tentang Kami</Link>
          </li>
          <li
            onClick={(event) => {
              event.preventDefault();
              // handleLinkClick("/");
              window.open(
                "https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0",
                "_blank",
                "noopener, noreferrer"
              );
            }}
          >
            <a>Bantuan</a>
          </li>
        </ul>
        <div className="navbarButtons">
          <button className="navbarButton" onClick={() => changePath("/login")}>
            <SlMagnifier className="navbarIcon" />
          </button>
          <Link className="navbarButton" to="/login">
            <CiUser className="userIcon" />
          </Link>
          <Link className="navbarButton" to="/login">
            <BsBag className="navbarIcon" />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
