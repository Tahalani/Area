import React from "react";
import { Link } from "react-router-dom";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
  serviceId: number;
}

const Square: React.FC<SquareProps> = ({ topImage, bottomText }) => {
  const backgroundColor = "#2e1d9c";

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Link to="/servicePage">
      <div
        style={{
          borderRadius: "10%",
          backgroundColor,
          width: "200px",
          height: "200px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          style={{
            fontFamily: "merriweather",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="pt-8"
        >
          <img
            src={topImage}
            alt="Image en haut"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div
          style={{
            fontFamily: "merriweather",
            height: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="text-[#fff]"
        >
          {capitalizeFirstLetter(bottomText)}
        </div>
      </div>
    </Link>
  );
};

export default Square;
