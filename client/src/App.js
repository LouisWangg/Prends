import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

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
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detailPage" element={<DetailPage />} />
          <Route path="/article" element={<Article />} />
          <Route path="/store" element={<Store />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/refundPolicy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
