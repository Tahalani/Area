import React from "react";
import { Link } from "react-router-dom";

interface SquareProps {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
}

const ActionsCard: React.FC<SquareProps> = ({ name, description }) => {
  const backgroundColor = "#2e1d9c";

  return (
    <div style={{ backgroundColor }} className="flex flex-col shadow-md rounded-2xl w-[200px] h-[200px]">
      <div style={{ fontFamily: 'merriweather' }} className="text-[#fff] flex items-center justify-center h-1/2">
        <div className="font-bold text-[100%]" >{name}</div>
      </div>
      <div style={{ fontFamily: 'merriweather' }} className="h-1/2 flex items-center justify-center text-[#fff]">
        {description}
      </div>
    </div>
  );

};

export default ActionsCard;
