import React, { Fragment, useState, useEffect, useRef, useCallback } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosPlay,
  IoIosPause,
} from "react-icons/io";
import "./Carousel.css";

export const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Use useRef to store timer without causing re-renders
  const timer = useRef(null);

  const nextSlide = useCallback(() => {
    setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  }, [data.length]);

  const prevSlide = () => {
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  // Update slide automatically every 3 seconds if playing
  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => {
        nextSlide();
      }, 10000); // Change slide every 3 seconds
    } else {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
    return () => {
      if (timer.current) {
        clearInterval(timer.current); // Cleanup timer on component unmount or when paused
      }
    } 
  }, [isPlaying, nextSlide]); // Only depend on isPlaying and nextSlide

  return (
    <Fragment>
      <div className="carousel">
        <div
          className="slides-container"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {data.map((item, idx) => (
            <img src={item.src} alt={item.alt} key={idx} className="slide" />
          ))}
        </div>
      </div>
      <div className="indicators">
        <IoIosArrowBack onClick={prevSlide} className="arrow arrow-left" />
        {data.map((_, idx) => (
          <button
            key={idx}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => setSlide(idx)}
          ></button>
        ))}
        <IoIosArrowForward onClick={nextSlide} className="arrow arrow-right" />
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? <IoIosPause /> : <IoIosPlay />}
        </button>
      </div>
    </Fragment>
  );
};
