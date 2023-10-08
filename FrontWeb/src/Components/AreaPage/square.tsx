import React from "react";
import { Link } from "react-router-dom";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Square: React.FC<SquareProps> = ({ topImage, bottomText, description }) => {
  const backgroundColor = getRandomColor();

  return (
    <Link to="/servicePage">
      <div style={{ borderRadius: "10%", backgroundColor, width: "200px", height: "200px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}>
        <div style={{ fontFamily: 'merriweather', height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} className="pt-8">
          <img src={topImage} alt="Image en haut" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </div>
        <div style={{ fontFamily: 'merriweather', height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} className="text-[#fff]">
          {bottomText}
        </div>
      </div>
    </Link>
  );
};

export default Square;
