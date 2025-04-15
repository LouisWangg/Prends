import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Line from "./Line";

const Tnc = ({tncText}) => {
  return (
    <Fragment>
      <Line />
      <div className="text-center">
        <p className="mt-4 mb-4">
          Dengan menekan tombol '{tncText}', saya telah membaca dan setuju dengan <Link>Syarat & Ketentuan</Link> <br />
          serta <Link>Kebijakan Privasi</Link> dari Klee.
        </p>
      </div>
    </Fragment>
  );
};

export default Tnc;
