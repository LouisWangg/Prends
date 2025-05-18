import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import image from "../assets/AboutUs.png";
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
        <p>
          Prends berasal dari bahasa Prancis yang berarti mengambil. Prends harap kehadirannya dapat membantu 
          orang-orang untuk mengambil waktu sejenak untuk terkoneksi dengan diri mereka untuk berproses dan 
          bertumbuh bersama dengan bantuan profesional. Prends juga terdengar seperti kata "friends", sehingga 
          Prends berharap kehadirannya dapat menjadi teman bagi mereka yang membutuhkan bantuan untuk sama-sama 
          bertumbuh. Dengan tagline #BePrendsent (dibaca Be Present), Prends hadir untuk membagikan awareness 
          dan menjadi jembatan penghubung bagi teman-teman yang mencari bantuan.
        </p>
        {/* <p>
          Klee berangkat dari keinginan untuk membagikan sebanyak-banyaknya dan
          berharap siapapun yang menggenggam daun ini mendapatkan
          'keberuntungan' yang dipakai untuk menjalani hidup yang lebih baik
          pada banyak aspek kehidupan di masa depan, sehingga nantinya berdampak
          membentuk pribadi yang lebih baik, pribadi yang lebih ramah terhadap
          dirinya sendiri, sesama manusia, dan lingkungan tempat dia tinggal.
        </p> */}

        <h6>Tentang Prends</h6>
        <p>
          Prends adalah platform layanan konseling serta kelas pengembangan diri dengan psikolog yang terlisensi. 
          Prends hadir sebagai platform yang menjembatani klien yang membutuhkan layanan konseling dengan psikolog 
          yang membutuhkan wadah untuk menghubungkan mereka dengan klien. Selain konseling, Prends juga menyediakan 
          layanan assessment, theraphy, dan layanan psikologi lainnya.
        </p>
        {/* <p>
          Dengan impian tersebut, Klee saat ini fokus membantu setiap individu
          dengan menyediakan konseling online ataupun offline dengan psikolog
          tersertifikasi, kelas-kelas seperti : seminar, webinar, atau workshop,
          dan meluncurkan produk seperti jurnal atau kartu eksplorasi sendiri.
        </p> */}
        {/* <br /> */}
        {/* <p>
          Saat ini Klee membagi layanan-layanan ke beberapa unit yang mempunyai
          fokusnya masing-masing.
          <br />
          <span className="subText">KLEEXPERT</span> : layanan psikologi seperti
          konseling online chat, konseling online call, konseling offline,
          konseling home visit, assessment, hinga theraphy dengan psikolog yang
          tersertifikasi.
        </p>
        <p>
          <span className="subText">KLEEDEMY</span> : layanan event seperti
          webinar, seminar, hingga workshop untuk pengembangan diri dengan
          narasumber yang kredibel.
        </p>
        <p>
          <span className="subText">KLEEMART</span> : unit produksi
          produk-produk pengembangan diri, seperti buku jurnal harian, dan kartu
          eksplorasi diri. KLEEMART sudah meluncurkan 2 series daily journal,
          Self Exploration Card, dan Exploration Card - Psychology Hacks
          Edition.
        </p>
        <b>
          Sejak 2018, Klee telah aktif berkolaborasi dengan berbagai partner
          untuk mencipatakan dunia yang lebih baik, di antaranya :
        </b>
        <div className="imageContainer">
          <img src={image} alt="Logo" className="aboutUsImage" />
        </div>
        <p>
          Terbaru, Klee berkolaborasi dengan @buranchi.id pada 26 Februari 2023
          untuk mengadakan cara speed dating dengan menghadirkan kartu
          <b> Exploration Card - Dating Edition</b> yang belum diluncurkan
          secara publik.
        </p> */}
        <h6>Connect with Prends</h6>
        <p>
          Dapatkan update terbaru dari Prends dengan mengikuti kami di :
          <br />
          Instagram :{" "}
          <Link
            to="#"
            url="https://www.instagram.com/klee.id/"
            onClick={(event) => openNewTab(event)}
          >
            @prends.id
          </Link>
          <br />
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
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default AboutUs;
