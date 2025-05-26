import React, { Fragment } from "react";
import "./RefundPolicy.css";

const RefundPolicy = () => {


  return (
    <Fragment>
      <h1 className="pageTitle">Kebijakan <br /> Pengembalian Uang</h1>
      <div style={{ textAlign: "justify", margin: "0 400px" }}>
        <ol>
          <li>
            Jika sesi tidak jadi dijadwalkan, maka biaya konseling yang telah
            dibayarkan hangus 50%. Jika klien tidak hadir dalam sesi yang sudah
            disepakati, maka biaya konseling yang telah dibayarkan hangus 100%.
          </li>
          <li>
            Pengajuan pengambalian dana dapat langsung menghubungi Customer
            Service di 0851-7202-0718 dan proses pengembalian dana dilakukan
            maksimal 14 hari kerja setelah permintaan diterima.
          </li>
          <li>Untuk kelas, tidak ada pengembalian dana yang dapat diajukan.</li>
        </ol>
      </div>
    </Fragment>
  );
};

export default RefundPolicy;
