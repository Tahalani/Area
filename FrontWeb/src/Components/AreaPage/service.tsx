import React from "react";
import Square from "./square.js";
import { useServiceContext } from "../../ServiceContext.js";

interface SquareProps {
  topImage: string;
  bottomText: string;
  linkTo: string;
}

const ServiceCase: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  linkTo,
}) => {
  const { setService } = useServiceContext();

  const handleServiceClick = () => {
    setService({ topImage, bottomText });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <Square topImage={topImage} bottomText={bottomText} linkTo={linkTo} />
      </div>
    </div>
  );
};

export default ServiceCase;
