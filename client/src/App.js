import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import Transaction from "./pages/Transaction";
import ListPage from "./pages/ListPage";
import Article from "./pages/Article";
import Store from "./pages/Store";
import AboutUs from "./pages/AboutUs";
import RefundPolicy from "./pages/RefundPolicy";

import { autoCheckLogin } from "./services/UserService";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const success = await autoCheckLogin(); // Attempt silent refresh
        if (!success) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Auto login failed:", error);
        navigate("/login");
      } finally {
        setIsLoading(false); // Always hide loading regardless of result
      }
    };
    autoLogin();
  }, [navigate]);

  if (isLoading) return <p>Checking session...</p>;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail-page/:type/:id" element={<DetailPage />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/list-page/:type/:subType?" element={<ListPage />} />
          <Route path="/article" element={<Article />} />
          <Route path="/store" element={<Store />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
