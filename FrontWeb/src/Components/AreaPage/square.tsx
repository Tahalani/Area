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
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
        className="w-[200px] h-[200px]"
      >
        <div
          style={{
            fontFamily: "merriweather",
          }}
          className="pt-8 flex items-center justify-center h-1/2"
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
          }}
          className="text-[20px] text-[#fff] flex items-center justify-center h-1/2"
        >
          {capitalizeFirstLetter(bottomText)}
        </div>
      </div>
    </Link>
  );
};

export default Square;
