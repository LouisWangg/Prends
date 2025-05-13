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
      <h1 className="pageTitle">Kenalan sama Klee yuk!</h1>
      <div className="aboutUsContainer">
        <h6>Filosofi</h6>
        <p>
          Klee berasal dari terjemahan Bahasa Jerman yang berarti daun semanggi.
          Biasanya daun semanggi hanya punya 3 helai daun. Namun, jika kamu
          berhasil menemukan daun semanggi yang mempunyai 4 helai daun dan
          menyimpannya, dipercayai kamu akan, mendapatkan keberuntungan.
        </p>
        <p>
          Klee berangkat dari keinginan untuk membagikan sebanyak-banyaknya dan
          berharap siapapun yang menggenggam daun ini mendapatkan
          'keberuntungan' yang dipakai untuk menjalani hidup yang lebih baik
          pada banyak aspek kehidupan di masa depan, sehingga nantinya berdampak
          membentuk pribadi yang lebih baik, pribadi yang lebih ramah terhadap
          dirinya sendiri, sesama manusia, dan lingkungan tempat dia tinggal.
        </p>

        <h6>Tentang Klee</h6>
        <p>
          Klee adalah platform media pengembangan diri yang telah berdiri sejak
          Juli 2018 dengan impian untuk mewujudkan dunia yang lebih baik. Klee
          percaya untuk mewujudkan dunia yang lebih baik harus dimulai dari diri
          kita sendiri.
        </p>
        <p>
          Dengan impian tersebut, Klee saat ini fokus membantu setiap individu
          dengan menyediakan konseling online ataupun offline dengan psikolog
          tersertifikasi, kelas-kelas seperti : seminar, webinar, atau workshop,
          dan meluncurkan produk seperti jurnal atau kartu eksplorasi sendiri.
        </p>
        <br />
        <p>
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
        </p>
        <h6>Connect With Klee</h6>
        <p>
          Dapatkan update terbaru dari Klee dengan mengikuti kami di :
          <br />
          Instagram :{" "}
          <Link
            to="#"
            url="https://www.instagram.com/klee.id/"
            onClick={(event) => openNewTab(event)}
          >
            @klee.id
          </Link>
          <br />
          Twitter :{" "}
          <Link
            to="#"
            url="https://x.com/klee_id"
            onClick={(event) => openNewTab(event)}
          >
            @klee_id
          </Link>
          <br />
          Facebook :{" "}
          <Link
            to="#"
            url="https://www.facebook.com/klee.indonesia/?_rdc=1&_rdr"
            onClick={(event) => openNewTab(event)}
          >
            Klee
          </Link>
          <br />
          Youtube :{" "}
          <Link
            to="#"
            url="https://www.youtube.com/kleeindonesia"
            onClick={(event) => openNewTab(event)}
          >
            Klee ID
          </Link>
          <br />
          Spotify :{" "}
          <Link
            to="#"
            url="https://open.spotify.com/show/7JRdDYLYSc93HCOOIzTsQo"
            onClick={(event) => openNewTab(event)}
          >
            KLEECORDER
          </Link>
          <br />
          TikTok :{" "}
          <Link
            to="#"
            url="https://www.tiktok.com/@klee.id"
            onClick={(event) => openNewTab(event)}
          >
            @klee.id
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default AboutUs;
