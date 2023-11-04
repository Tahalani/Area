import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
  serviceId: number;
  showCheckmark: boolean;
}

const Square: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  showCheckmark,
}) => {
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
          position: "relative",
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
        {showCheckmark && (
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: "green",
              borderRadius: "50%",
              padding: "4px",
            }}
          >
            <FaCheck style={{ color: "white" }} />
          </div>
        )}
      </div>
    </Link>
  );
};

export default Square;
