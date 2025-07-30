import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { PiWarningCircleFill } from "react-icons/pi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import "./Auth.css";
import { emailRegex } from "../utils/InputValidator";
import Tnc from "../components/Tnc";
// import { loginUser } from "../services/UserService";

const Login = () => {
  // const navigate = useNavigate(); dipake pas teken button dan mau kirim data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const newErrors = {
      email: [],
      password: [],
    };

    if (!trimmedEmail) {
      newErrors.email.push("Email tidak boleh kosong.");
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email.push("Format Email tidak valid. Contoh: halo.prends@example.com atau halo.prends@example.co.id");
    }

    if (!trimmedPassword) {
      newErrors.password.push("Kata Sandi tidak boleh kosong.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(arr => arr.length > 0);
    if (hasError) return;

    // const userData = {
    //   email: "test@example.com",
    //   password: "123456",
    // };

    // const response = await loginUser(userData);
    // console.log("Service response: ", response);
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
          <div className="authForm">
            <div>
              <input
                type="text"
                className="authInput"
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
              {errors.email.length > 0 && (
                <ul className="errorList">
                  {errors.email.map((err, idx) => (
                    <li key={idx} className="errorText">
                      <PiWarningCircleFill className="errorIcon" />
                      {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <div
                className="authPasswordWrapper"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                tabIndex={-1} //Makes wrapper focusable, but not in tab order
              >
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="authInput"
                  placeholder="Sandi"
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
              {errors.password.length > 0 && (
                <ul className="errorList">
                  {errors.password.map((err, idx) => (
                    <li key={idx} className="errorText">
                      <PiWarningCircleFill className="errorIcon" />
                      {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link className="customUnderline" onClick={() => setIsForgotPassword(true)}>Lupa sandi?</Link>
            <div className="authButtonWrapper">
              <button type="button" className="authButton" onClick={handleLogin} >
                Masuk
              </button>
            </div>
            <div className="authLinkWrapper">
              <Link to="/register" className="customUnderline">
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
          <div className="authForm">
            <input
              type="text"
              className="authInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
            />
            <div className="authButtonWrapper">
              <button type="button" className="authButton" onClick={handleLogin} >
                Kirim
              </button>
            </div>
            <div className="authLinkWrapper">
              <Link className="customUnderline" onClick={() => setIsForgotPassword(false)}>
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
