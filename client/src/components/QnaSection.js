import React, { useState, useRef } from "react";
import { Typography } from "@mui/material";
import { RxChevronUp, RxChevronDown } from "react-icons/rx";
import "./QnaSection.css";

const QnaSection = () => {
    const dropdownRef = useRef(null); // Reference to the dropdown
    const [isQuestionOneOpen, setIsQuestionOneOpen] = useState(false);
    const [isQuestionTwoOpen, setIsQuestionTwoOpen] = useState(false);
    const [isQuestionThreeOpen, setIsQuestionThreeOpen] = useState(false);
    const [isQuestionFourOpen, setIsQuestionFourOpen] = useState(false);
    const [isQuestionFiveOpen, setIsQuestionFiveOpen] = useState(false);

    const toggleQuestionOne = () => {
        setIsQuestionOneOpen(!isQuestionOneOpen);
    };

    const toggleQuestionTwo = () => {
        setIsQuestionTwoOpen(!isQuestionTwoOpen);
    };

    const toggleQuestionThree = () => {
        setIsQuestionThreeOpen(!isQuestionThreeOpen);
    };

    const toggleQuestionFour = () => {
        setIsQuestionFourOpen(!isQuestionFourOpen);
    };

    const toggleQuestionFive = () => {
        setIsQuestionFiveOpen(!isQuestionFiveOpen);
    };

    return (
        <div className="qnaWrapper">
            <Typography variant="h4" className="qnaTitle">
                Beberapa pertanyaan Prendsters seputar layanan prends!
            </Typography>
            <div className="qnaItem">
                <button onClick={toggleQuestionOne} className={`qnaButton ${isQuestionOneOpen ? "open" : ""}`} ref={dropdownRef}>
                    Jenis konseling apa yang cocok untuk aku?
                    {isQuestionOneOpen ? (
                        <RxChevronUp className="menuIcon" />
                    ) : (
                        <RxChevronDown className="menuIcon" />
                    )}
                </button>
                {isQuestionOneOpen && (
                    <div className="qnaContent">
                        <p>
                            Jenis konseling yang cocok untuk kamu bisa disesuaikan dengan kondisi kamu ya.
                            <br /><br />
                            Jika kamu masih malu atau ragu, kamu boleh coba konseling chat terlebih dahulu.
                            Tapi jika kamu sudah memiliki keberanian, prends sarankan kamu untuk ambil sesi
                            online call atau offline agar sesi berlangsung lebih nyaman untukmu!
                        </p>
                    </div>
                )}

                <button onClick={toggleQuestionTwo} className={`qnaButton ${isQuestionTwoOpen ? "open" : ""}`} ref={dropdownRef}>
                    Bagaimana alur konseling di prends?
                    {isQuestionTwoOpen ? (
                        <RxChevronUp className="menuIcon" />
                    ) : (
                        <RxChevronDown className="menuIcon" />
                    )}
                </button>
                {isQuestionTwoOpen && (
                    <div className="qnaContent">
                        <p>
                            Kamu cukup membuat akun terlebih dahulu, kemudian dilanjutkan dengan memilih 
                            jenis konseling yang kamu inginkan.
                            <br /><br />
                            Setelah menyelesaikan pembayaran, Customer Service kami akan menghubungi kamu 
                            melalui WhatsApp untuk konfirmasi jadwal dan pengisian data konseling. Atau 
                            jika kami ingin prosesnya 
                        </p>
                    </div>
                )}

                <button onClick={toggleQuestionThree} className={`qnaButton ${isQuestionThreeOpen ? "open" : ""}`} ref={dropdownRef}>
                    Jenis konseling apa yang cocok untuk akuuuuuu
                    {isQuestionThreeOpen ? (
                        <RxChevronUp className="menuIcon" />
                    ) : (
                        <RxChevronDown className="menuIcon" />
                    )}
                </button>
                {isQuestionThreeOpen && (
                    <div className="qnaContent">
                        <p>
                            Jenis konseling yang cocok untuk kamu bisa disesuaikan dengan kondisi kamu ya.
                            <br /><br />
                            Jika kamu masih malu atau ragu, kamu boleh coba konseling chat terlebih dahulu.
                            Tapi jika kamu sudah memiliki keberanian, prends sarankan kamu untuk ambil sesi
                            online call atau offline agar sesi berlangsung lebih nyaman untukmu!
                        </p>
                    </div>
                )}

                <button onClick={toggleQuestionFour} className={`qnaButton ${isQuestionFourOpen ? "open" : ""}`} ref={dropdownRef}>
                    Jenis konseling apa yang cocok untuk akuuuuuu
                    {isQuestionFourOpen ? (
                        <RxChevronUp className="menuIcon" />
                    ) : (
                        <RxChevronDown className="menuIcon" />
                    )}
                </button>
                {isQuestionFourOpen && (
                    <div className="qnaContent">
                        <p>
                            Jenis konseling yang cocok untuk kamu bisa disesuaikan dengan kondisi kamu ya.
                            <br /><br />
                            Jika kamu masih malu atau ragu, kamu boleh coba konseling chat terlebih dahulu.
                            Tapi jika kamu sudah memiliki keberanian, prends sarankan kamu untuk ambil sesi
                            online call atau offline agar sesi berlangsung lebih nyaman untukmu!
                        </p>
                    </div>
                )}

                <button onClick={toggleQuestionFive} className={`qnaButton ${isQuestionFiveOpen ? "open" : ""}`} ref={dropdownRef}>
                    Jenis konseling apa yang cocok untuk akuuuuuu
                    {isQuestionFiveOpen ? (
                        <RxChevronUp className="menuIcon" />
                    ) : (
                        <RxChevronDown className="menuIcon" />
                    )}
                </button>
                {isQuestionFiveOpen && (
                    <div className="qnaContent">
                        <p>
                            Jenis konseling yang cocok untuk kamu bisa disesuaikan dengan kondisi kamu ya.
                            <br /><br />
                            Jika kamu masih malu atau ragu, kamu boleh coba konseling chat terlebih dahulu.
                            Tapi jika kamu sudah memiliki keberanian, prends sarankan kamu untuk ambil sesi
                            online call atau offline agar sesi berlangsung lebih nyaman untukmu!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QnaSection;
