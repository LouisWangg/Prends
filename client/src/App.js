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
import DetailPage from "./pages/DetailPage";
import Article from "./pages/Article";
import Store from "./pages/Store";
import AboutUs from "./pages/AboutUs";
import RefundPolicy from "./pages/RefundPolicy";

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
            <Route path="/detailPage" element={<DetailPage />} />
            <Route path="/article" element={<Article />} />
            <Route path="/store" element={<Store />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/refundPolicy" element={<RefundPolicy />} />
          </Routes>
        </div>
        <Line />
        <Footer />
      </Fragment>
    </Router>
  );
}

export default App;
