import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tnc from "../components/Tnc";
import { loginUser } from "../services/UserService"; // Import the service

const Login = () => {
  // const navigate = useNavigate(); dipake pas teken submit Login untuk pindah page
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
      const userData = {
        email: "test@example.com",
        password: "123456",
      };
  
      const response = await loginUser(userData);
      console.log("Service response: ", response);
    };

  const onRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      await fetch("http://localhost:5000/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center pageTitle">Login</h1>
      <form onSubmit={onRegisterForm} style={{ margin: "0 500px 0 500px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-3 mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link style={{ fontWeight: "300" }}>Lupa password?</Link>
        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            style={{ width: "120px", height: "50px" }}
            onClick={handleLogin}
          >
            Masuk
          </button>
        </div>
        <div className="text-center mt-3">
          <Link to="/register" style={{ fontWeight: "300" }}>
            Buat Akun
          </Link>
        </div>
      </form>
      <Tnc tncText="Masuk" />
    </Fragment>
  );
};

export default Login;
