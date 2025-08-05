import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Line from "./Line";

const Layout = () => {
  // const [isSticky, setIsSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsSticky(window.scrollY > 0);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar showNavbar={showNavbar} />
      {showNavbar && <div style={{ height: showNavbar ? "120px" : "0px", transition: "height 0.3s ease" }} />} {/* ✅ Only when visible */}
      <div className={`container`}>
        <Outlet />
      </div>
      <Line />
      <Footer />
    </>
  );
};

export default Layout;
