import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";

import "./Navbar.css";
import logo from "../assets/Logo.png";

const Navbar = ({ isSticky }) => {
  const location = useLocation();
  const activePath = location.pathname;
  const isActive = (path, exact = false) =>
    exact ? activePath === path : activePath.startsWith(path);

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const handleServiceMenuToggle = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const handleExpertMenuToggle = () => {
    setIsExpertOpen(!isExpertOpen);
  };

  const handleClassMenuToggle = () => {
    setIsClassOpen(!isClassOpen);
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
          className={`${isActive("/", true) ? "navbarLinkActive" : ""}`}
        >
          <Link to="/">Beranda</Link>
        </li>
        <li
          className={`${isActive("/article") ? "navbarLinkActive" : ""}`}
        >
          <Link to="/article">Artikel</Link>
        </li>
        <li
          className={`dropdown 
            ${isActive("/service") ? "navbarLinkActive" : ""}
            ${isServiceOpen ? "dropdownOpen" : ""}
          `}
          onClick={() => {
            handleServiceMenuToggle();
          }}
        >
          Layanan
          {isServiceOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/service/topic1"
                  >
                    Konseling Individu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/topic2"
                  >
                    Konseling Pasangan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/topic3"
                  >
                    Konseling Keluarga
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/topic4"
                  >
                    Assessment
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/topic5"
                  >
                    Therapy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/service/topic6"
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
          className={`dropdown ${isActive("/counselor") ? "navbarLinkActive" : ""}`}
          onClick={() => {
            handleExpertMenuToggle();
          }}
        >
          Konseling
          {isExpertOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/counselor/topic9"
                  >
                    Junior Expert
                  </Link>
                </li>
                <li>
                  <Link
                    to="/counselor/topic10"
                  >
                    Middle Expert
                  </Link>
                </li>
                <li>
                  <Link
                    to="/counselor/topic11"
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
          className={`dropdown ${isActive("/class") ? "navbarLinkActive" : ""}`}
          onClick={() => {
            handleClassMenuToggle();
          }}
        >
          Kelas
          {isClassOpen ? (
            <>
              <RxChevronUp className="navbarLinkIcon" />
              <ul className="dropdownMenu">
                <li>
                  <Link
                    to="/class/topic7"
                  >
                    Kelas Mendatang
                  </Link>
                </li>
                <li>
                  <Link
                    to="/class/topic8"
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
            className={`${isActive("/store") ? "navbarLinkActive" : ""}`}
          >
            <Link to="/kleemart">KLEEMART</Link>
          </li> */}
        <li
          className={`${isActive("/aboutUs") ? "navbarLinkActive" : ""}`}
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
