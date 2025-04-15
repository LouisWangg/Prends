import React, { Fragment, useState } from "react";
import Tnc from "../components/Tnc";

const Register = () => {
  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      await fetch("http://localhost:5000/insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/register";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center pageTitle">Register</h1>
      <form onSubmit={onRegisterForm} style={{ margin: "0 500px 0 500px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Nama Depan"
          value={name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Nama Belakang"
        />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center mt-4">
          <button
            className="btn btn-success"
            style={{ width: "120px", height: "50px" }}
          >
            Buat
          </button>
        </div>
      </form>
      <Tnc tncText="Buat" />
    </Fragment>
  );
};

export default Register;
