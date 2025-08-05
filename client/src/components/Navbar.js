import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import { CiUser } from "react-icons/ci";
import { BsBag } from "react-icons/bs";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";

import "./Navbar.css";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;
  const isActive = (path, exact = false) =>
    exact ? activePath === path : activePath.includes(path);

  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);

  const handleServiceMenuToggle = () => {
    setIsServiceOpen(!isServiceOpen);
    setIsExpertOpen(false);
    setIsClassOpen(false);
  };

  const handleExpertMenuToggle = () => {
    setIsExpertOpen(!isExpertOpen);
    setIsServiceOpen(false);
    setIsClassOpen(false);
  };

  const handleClassMenuToggle = () => {
    setIsClassOpen(!isClassOpen);
    setIsServiceOpen(false);
    setIsExpertOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeAllDropdowns = (e) => {
      // Only close if click is outside any dropdown
      if (!e.target.closest(".dropdown")) {
        setIsServiceOpen(false);
        setIsExpertOpen(false);
        setIsClassOpen(false);
      }
    };
    document.addEventListener("mousedown", closeAllDropdowns);
    return () => document.removeEventListener("mousedown", closeAllDropdowns);
  }, []);

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY === 0); // Show only at top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbarWrapper ${showNavbar ? "visible" : "hidden"}`}>
      <img src={logo} alt="logo" height={70} />
      <ul className="navbarLists">
        <li className={`${isActive("/", true) ? "navbarLinkActive" : ""}`}>
          <Link to="/">Beranda</Link>
        </li>
        <li className={`${isActive("/article") ? "navbarLinkActive" : ""}`}>
          <Link to="/article">Artikel</Link>
        </li>
        <li
          className={`dropdown 
            ${isActive("/service") ? "navbarLinkActive" : ""}
            ${isServiceOpen ? "dropdownOpen" : ""}
          `}
        >
          <span onClick={handleServiceMenuToggle}>
            Layanan
            {isServiceOpen ? (
              <RxChevronUp className="navbarLinkIcon" />
            ) : (
              <RxChevronDown className="navbarLinkIcon" />
            )}
          </span>
          {isServiceOpen && (
            <ul className="dropdownMenu">
              <li>
                <Link
                  to="/list-page/service/konseling-individual"
                  onClick={() => setIsServiceOpen(false)}
                >
                  Konseling Individu
                </Link>
              </li>
              <li>
                <Link
                  to="/list-page/service/konseling-pasangan"
                  onClick={() => setIsServiceOpen(false)}
                >
                  Konseling Pasangan
                </Link>
              </li>
              <li>
                <Link
                  to="/list-page/service/konseling-keluarga"
                  onClick={() => setIsServiceOpen(false)}
                >
                  Konseling Keluarga
                </Link>
              </li>
              <li>
                <Link to="/list-page/service/assessment" onClick={() => setIsServiceOpen(false)}>Assessment</Link>
              </li>
              <li>
                <Link to="/list-page/service/theraphy" onClick={() => setIsServiceOpen(false)}>Theraphy</Link>
              </li>
              <li>
                <Link to="/list-page/service/wawancara" onClick={() => setIsServiceOpen(false)}>Wawancara</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          className={`dropdown 
            ${isActive("/counselor") ? "navbarLinkActive" : ""}
            ${isExpertOpen ? "dropdownOpen" : ""}
          `}
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
                  <Link to="/list-page/counselor/junior-expert" onClick={() => setIsExpertOpen(false)}>Junior Expert</Link>
                </li>
                <li>
                  <Link to="/list-page/counselor/middle-expert" onClick={() => setIsExpertOpen(false)}>Middle Expert</Link>
                </li>
                <li>
                  <Link to="/list-page/counselor/senior-expert" onClick={() => setIsExpertOpen(false)}>Senior Expert</Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="navbarLinkIcon" />
          )}
        </li>
        <li
          className={`dropdown 
            ${isActive("/class") ? "navbarLinkActive" : ""}
            ${isClassOpen ? "dropdownOpen" : ""}
          `}
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
                  <Link to="/list-page/class/kelas-mendatang" onClick={() => setIsClassOpen(false)}>Kelas Mendatang</Link>
                </li>
                <li>
                  <Link to="/list-page/class/rekaman-kelas" onClick={() => setIsClassOpen(false)}>Rekaman Kelas</Link>
                </li>
              </ul>
            </>
          ) : (
            <RxChevronDown className="navbarLinkIcon" />
          )}
        </li>
        <li className={`${isActive("/aboutUs") ? "navbarLinkActive" : ""}`}>
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
