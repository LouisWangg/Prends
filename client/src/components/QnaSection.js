import React, { useState } from "react";
import { Typography } from "@mui/material";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";
import "./QnaSection.css";

const QnaSection = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const secondQuestion = () => {
    return (
      <p>
        Kamu cukup membuat akun terlebih dahulu, kemudian dilanjutkan dengan
        memilih jenis konseling yang kamu inginkan.
        <br />
        <br />
        Setelah menyelesaikan pembayaran, Customer Service kami akan menghubungi
        kamu melalui WhatsApp untuk konfirmasi jadwal dan pengisian data
        konseling. Atau jika kamu ingin prosesnya lebih cepat, kamu bisa
        langsung chat 3 jadwal (berupa tanggal dan jam) ke Customer Service kami
        agar langsung dibantu penjadwalan sesi.
        <br />
        <br />
        Kamu bisa WhatsApp ke{" "}
        <button
          onClick={() => {
            window.open(
              "https://api.whatsapp.com/send/?phone=6285172020718&text&type=phone_number&app_absent=0",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className="linkButton customUnderline"
        >
          0851-7202-0718 
        </button> {" "} ya!
      </p>
    );
  };

  return (
    <div className="qnaWrapper">
      <Typography variant="h4" className="qnaTitle">
        Beberapa pertanyaan Prendsters seputar layanan prends!
      </Typography>
      <div className="qnaItem">
        {data.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => toggleQuestion(index)}
              className={`qnaButton ${openIndex === index ? "open" : ""}`}
            >
              {item.title}
              {openIndex === index ? (
                <RxChevronUp className="menuIcon" />
              ) : (
                <RxChevronDown className="menuIcon" />
              )}
            </button>
            {openIndex === index && (
              <div className="qnaContent">
                {item.qnaId === 2 ? (
                  secondQuestion()
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: item.description }} />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnaSection;
