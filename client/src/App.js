import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Line from "./components/Line";

//pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Kleemart from "./pages/Kleemart";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/article" element={<Article />} />
            <Route path="/kleemart" element={<Kleemart />} />
            <Route path="/aboutUs" element={<AboutUs />} />
          </Routes>
        </div>
        <Line />
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
