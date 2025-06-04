import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const AboutUs = () => {
  const openNewTab = (event) => {
    event.preventDefault();
    window.open(
      event.currentTarget.getAttribute("url"),
      "_blank",
      "noopener, noreferrer"
    );
  };

  return (
    <Fragment>
      <h1 className="pageTitle">Let's be Prends!</h1>
      <div className="aboutUsContainer">
        <h6>Filosofi</h6>

        {/* <p>
          <strong>Perhatian :</strong>
        </p>
        <ol>
          <li>
            Syarat dan ketentuan pengembalian dana dapat kamu cek di{" "}
            <a href="/refundPolicy" class="customUnderline" target="_blank" rel="noopener noreferrer">
              https://prends.id/policies/refund-policy
            </a>
          </li>
          <li>
            Jika ada pertanyaan atau kendala seputar kelas ini, bisa kamu
            tanyakan ke Customer Service melalui{" "}
            <a href="https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0"
              class="customUnderline" target="_blank" rel="noopener noreferrer">
              s.id/askprends
            </a>
          </li>
        </ol>
        <br /> */}

        <p>
          Prends berasal dari bahasa Prancis yang berarti mengambil. Prends
          harap kehadirannya dapat membantu orang-orang untuk mengambil waktu
          sejenak untuk terkoneksi dengan diri mereka untuk berproses dan
          bertumbuh bersama dengan bantuan profesional. Prends juga terdengar
          seperti kata "friends", sehingga Prends berharap kehadirannya dapat
          menjadi teman bagi mereka yang membutuhkan bantuan untuk sama-sama
          bertumbuh. Dengan tagline #BePrendsent (dibaca Be Present), Prends
          hadir untuk membagikan awareness dan menjadi jembatan penghubung bagi
          teman-teman yang mencari bantuan.
        </p>

        <h6>Tentang Prends</h6>
        <p>
          Prends adalah platform layanan konseling serta kelas pengembangan diri
          dengan psikolog yang terlisensi. Prends hadir sebagai platform yang
          menjembatani klien yang membutuhkan layanan konseling dengan psikolog
          yang membutuhkan wadah untuk menghubungkan mereka dengan klien. Selain
          konseling, Prends juga menyediakan layanan assessment, theraphy, dan
          layanan psikologi lainnya.
        </p>
        <h6>Connect with Prends</h6>
        <p>
          Dapatkan update terbaru dari Prends dengan mengikuti kami di :
          <br />
          Instagram :{" "}
          <Link
            to="#"
            url="https://www.instagram.com/prends.id"
            onClick={(event) => openNewTab(event)}
            className="customUnderline"
          >
            @prends.id
          </Link>
          {/* <br />
          Twitter :{" "}
          <Link
            to="#"
            url="https://x.com/klee_id"
            onClick={(event) => openNewTab(event)}
          >
            @prends_id
          </Link>
          <br />
          Facebook :{" "}
          <Link
            to="#"
            url="https://www.facebook.com/klee.indonesia/?_rdc=1&_rdr"
            onClick={(event) => openNewTab(event)}
          >
            Prends
          </Link>
          <br />
          Youtube :{" "}
          <Link
            to="#"
            url="https://www.youtube.com/kleeindonesia"
            onClick={(event) => openNewTab(event)}
          >
            Prends ID
          </Link>
          <br />
          Spotify :{" "}
          <Link
            to="#"
            url="https://open.spotify.com/show/7JRdDYLYSc93HCOOIzTsQo"
            onClick={(event) => openNewTab(event)}
          >
            PRENDSCORDER
          </Link>
          <br />
          TikTok :{" "}
          <Link
            to="#"
            url="https://www.tiktok.com/@klee.id"
            onClick={(event) => openNewTab(event)}
          >
            @prends.id
          </Link> */}
        </p>
      </div>
    </Fragment>
  );
};

export default AboutUs;
