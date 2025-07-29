import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Line from "./Line";

const Tnc = ({tncText}) => {
  return (
    <Fragment>
      <Line />
      <div style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
        <p style={{margin: "auto"}}>
          Dengan menekan tombol '{tncText}', saya telah membaca dan setuju dengan <Link className="customUnderline">
          Syarat & Ketentuan</Link> <br /> serta <Link className="customUnderline">Kebijakan Privasi</Link> dari Prends.
        </p>
      </div>
    </Fragment>
  );
};

export default Tnc;
