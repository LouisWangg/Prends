import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Line from "./Line";

const Layout = () => {
  // const [showNavbar, setShowNavbar] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0); // 
      // setShowNavbar(window.scrollY === 0); // Only show at top
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* <Navbar showNavbar={showNavbar} /> */}
      <Navbar isSticky={isSticky} />
      <div className={`container ${isSticky ? "pageTitlePadding" : ""}`}>
        <Outlet />
      </div>
      <Line />
      <Footer />
    </>
  );
};

export default Layout;
