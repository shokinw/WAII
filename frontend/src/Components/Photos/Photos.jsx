import React, { useEffect, useState } from "react";
import "./Photos.css";

// ✅ imported images
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";
import p9 from "../assets/p9.jpg";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";

const PhotoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5;

  // Auto-slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="photos-container">
      {/* Slider */}
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <img src={p9} alt="Slide 1" />
          <img src={p2} alt="Slide 2" />
          <img src={p1} alt="Slide 3" />
          <img src={p7} alt="Slide 4" />
          <img src={p8} alt="Slide 5" />
        </div>
      </div>

      {/* Dots */}
      <div className="dots">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={currentSlide === i ? "dot active" : "dot"}
            onClick={() => setCurrentSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlider;
