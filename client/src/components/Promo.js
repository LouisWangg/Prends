import React, { Fragment } from "react";
import "./Promo.css";

const Promo = () => {
  return (
    <Fragment>
      <div className="promoBackground">
        <p className="promoText">
          Pakai kode voucher 'MULAIDARIKAMU' untuk potongan harga konseling
          sebesar 50%!
        </p>
      </div>
    </Fragment>
  );
};

export default Promo;
