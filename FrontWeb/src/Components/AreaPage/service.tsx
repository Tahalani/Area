import React from "react";
import Square from "./square.js";
import { useServiceContext } from "../../ServiceContext.js";

interface SquareProps {
  topImage: string;
  bottomText: string;
  description: string;
  serviceId: number;
}

const ServiceCase: React.FC<SquareProps> = ({
  topImage,
  bottomText,
  description,
  serviceId,
}) => {
  const { setService } = useServiceContext();

  const handleServiceClick = () => {
    setService({ topImage, bottomText, description, serviceId });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <Square
          topImage={topImage}
          bottomText={bottomText}
          description={description}
          serviceId={serviceId}
        />
      </div>
    </div>
  );
};

export default ServiceCase;
