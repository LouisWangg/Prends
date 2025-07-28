import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import "./Login.css";
import Tnc from "../components/Tnc";
// import { loginUser } from "../services/UserService";

const Login = () => {
  // const navigate = useNavigate(); dipake pas teken button dan mau kirim data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    // const userData = {
    //   email: "test@example.com",
    //   password: "123456",
    // };

    // const response = await loginUser(userData);
    console.log("Masuk ke login");
  };

  // const onRegisterForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const body = { email, password };
  //     await fetch("http://localhost:5000/insert", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     });
  //     window.location = "/";
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <>
      {!isForgotPassword ? (
        <>
          <Typography variant="h3" className="pageTitle">Login</Typography>
          <div className="loginForm">
            <input
              type="text"
              className="loginInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  passwordRef.current?.focus();
                }
              }}
            />
            <div
              className="loginPasswordWrapper"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              tabIndex={-1} //Makes wrapper focusable, but not in tab order
            >
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className="loginInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
              />
              {password && isPasswordFocused && (
                <span className="showPasswordIcon"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input from losing focus
                    setShowPassword(!showPassword);
                  }}>
                  {showPassword ? <VscEyeClosed /> : <VscEye />}
                </span>
              )}
            </div>
            <Link className="loginLink" onClick={() => setIsForgotPassword(true)}>Lupa sandi?</Link>
            <div className="text-center mt-4">
              <button type="button" className="loginButton" onClick={handleLogin} >
                Masuk
              </button>
            </div>
            <div className="text-center mt-3">
              <Link to="/register" className="loginLink">
                Buat Akun
              </Link>
            </div>
          </div>
          <Tnc tncText="Masuk" />
        </>
      ) : (
        <>
          <Typography variant="h3" className="pageTitle">Reset Sandi</Typography>
          <Typography variant="body1" className="pageTitle">Kami akan mengirimi Anda email untuk mereset sandi</Typography>
          <div className="loginForm">
            <input
              type="text"
              className="loginInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <div className="text-center mt-4">
              <button type="button" className="loginButton" onClick={handleLogin} >
                Kirim
              </button>
            </div>
            <div className="text-center mt-3">
              <Link className="loginLink" onClick={() => setIsForgotPassword(false)}>
                Batal
              </Link>
            </div>
          </div>
          <Tnc tncText="Masuk" />
        </>
      )}
    </>
  );
};

export default Login;
