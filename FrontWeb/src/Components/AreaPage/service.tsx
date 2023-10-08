import React from "react";
import Square from "./square.js";
import { useServiceContext } from "../../ServiceContext.js";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
}

const ServiceCase: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  description,
}) => {
  const { setService } = useServiceContext();

  const handleServiceClick = () => {
    setService({ topImage, bottomText });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <Square topImage={topImage} bottomText={bottomText} description={description} />
      </div>
    </div>
  );
};

export default ServiceCase;
