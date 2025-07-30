import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { PiWarningCircleFill } from "react-icons/pi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import "./Auth.css";
import { emailRegex, nameRegex, passwordRegex } from "../utils/InputValidator";
import Tnc from "../components/Tnc";
// import { registerUser } from "../services/UserService";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [errors, setErrors] = useState({
    firstName: [],
    lastName: [],
    email: [],
    password: [],
  });

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = async () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const newErrors = {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    };

    if (!trimmedFirstName) {
      newErrors.firstName.push("Nama Depan tidak boleh kosong.");
    }

    if (!nameRegex.test(trimmedFirstName)) {
      newErrors.firstName.push("Nama Depan hanya boleh berisi huruf, titik, tanda petik, atau tanda hubung.");
    }

    if (trimmedFirstName.length > 100) {
      newErrors.firstName.push("Nama Depan tidak boleh lebih dari 100 karakter.");
    }

    if (!trimmedLastName) {
      newErrors.lastName.push("Nama Belakang tidak boleh kosong.");
    }

    if (!nameRegex.test(trimmedLastName)) {
      newErrors.lastName.push("Nama Belakang hanya boleh berisi huruf, titik, tanda petik, atau tanda hubung.");
    }

    if (trimmedLastName.length > 100) {
      newErrors.lastName.push("Nama Belakang tidak boleh lebih dari 100 karakter.");
    }

    if (!trimmedEmail) {
      newErrors.email.push("Email tidak boleh kosong.");
    }

    if (!emailRegex.test(trimmedEmail)) {
      newErrors.email.push("Format Email tidak valid. Contoh: halo.prends@example.com atau halo.prends@example.co.id");
    }

    if (trimmedEmail.length > 150) {
      newErrors.email.push("Email tidak boleh lebih dari 150 karakter.");
    }

    if (!trimmedPassword) {
      newErrors.password.push("Kata Sandi tidak boleh kosong.");
    }

    if (!passwordRegex.test(trimmedPassword)) {
      newErrors.password.push("Kata Sandi harus mengandung setidaknya satu huruf, satu angka, dan satu karakter spesial.");
    }

    if (trimmedPassword.length < 8) {
      newErrors.password.push("Kata Sandi tidak boleh kurang dari 8 karakter.");
    }

    if (trimmedPassword.length > 100) {
      newErrors.password.push("Kata Sandi tidak boleh lebih dari 100 karakter.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(arr => arr.length > 0);
    if (hasError) return;

    // const userData = {
    //   email: "test@example.com",
    //   password: "123456",
    //   firstName: "John",
    //   lastName: "Doe"
    // };

    // const response = await registerUser(userData);
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
  //     window.location = "/register";
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <>
      <Typography variant="h3" className="pageTitle">Register</Typography>
      <div className="authForm">
        <div>
          <input
            type="text"
            className={`authInput ${errors.firstName.length > 0 ? "error" : ""}`}
            placeholder="Nama Depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                lastNameRef.current?.focus();
              }
            }}
          />
          {errors.firstName.length > 0 && (
            <ul className="errorList">
              {errors.firstName.map((err, idx) => (
                <li key={idx} className="errorText">
                  <PiWarningCircleFill className="errorIcon" />
                  {err}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <input
            ref={lastNameRef}
            type="text"
            className={`authInput ${errors.lastName.length > 0 ? "error" : ""}`}
            placeholder="Nama Belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                emailRef.current?.focus();
              }
            }}
          />
          {errors.lastName.length > 0 && (
            <ul className="errorList">
              {errors.lastName.map((err, idx) => (
                <li key={idx} className="errorText">
                  <PiWarningCircleFill className="errorIcon" />
                  {err}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <input
            ref={emailRef}
            type="text"
            className={`authInput ${errors.email.length > 0 ? "error" : ""}`}
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
                  {err.includes("Contoh:") ? (
                    <>
                      Format Email tidak valid. <br />
                      Contoh: halo.prends@example.com.
                    </>
                  ) : (
                    err
                  )}
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
              className={`authInput ${errors.password.length > 0 ? "error" : ""}`}
              placeholder="Sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRegister();
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

        <div className="authButtonWrapper">
          <button type="button" className="authButton" onClick={handleRegister}>
            Buat
          </button>
        </div>
      </div>
      <Tnc tncText="Buat" />
    </>
  );
};

export default Register;
