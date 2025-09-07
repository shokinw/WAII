// src/Components/Big/Big.jsx
import React from "react";
import "./Big.css";
import BigImage from "../assets/BigImage.png"; // ✅ renamed to BigImage

const Big = () => { // ✅ component renamed
  return (
    <div className="full-photo">
      <img src={BigImage} alt="Full Length" />
    </div>
  );
};

export default Big;
