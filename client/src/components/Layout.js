import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Line from "./Line";

const Layout = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar isSticky={isSticky} />
      <div className={`container ${isSticky ? "pageTitlePadding" : ""}`}>
        <Outlet context={{ isSticky }} />
      </div>
      <Line />
      <Footer />
    </>
  );
};

export default Layout;
