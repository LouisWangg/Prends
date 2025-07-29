import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import "./Auth.css";
import Tnc from "../components/Tnc";
// import { registerUser } from "../services/UserService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegister = async () => {
    // const userData = {
    //   email: "test@example.com",
    //   password: "123456",
    //   firstName: "John",
    //   lastName: "Doe"
    // };

    // const response = await registerUser(userData);
    // console.log("Service response: ", response);
    console.log("Masuk ke register");
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
        <input
          type="text"
          className="authInput"
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
        <input
          ref={lastNameRef}
          type="text"
          className="authInput"
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
        <input
          ref={emailRef}
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
            placeholder="Password"
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
