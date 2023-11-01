import React from "react";

interface SquareProps {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
}

const ReactionsCard: React.FC<SquareProps> = ({ name }) => {
  const backgroundColor = "#2e1d9c";

  return (
    <div
      style={{ backgroundColor, width: "400px", height: "50px" }}
      className="mb-[2%] flex flex-col shadow-md rounded-2xl"
    >
      <div
        style={{ fontFamily: "merriweather" }}
        className="text-[#fff] flex items-center justify-center"
      >
        <div className="font-bold text-[100%] pt-[3%]">{name}</div>
      </div>
    </div>
  );
};

export default ReactionsCard;
