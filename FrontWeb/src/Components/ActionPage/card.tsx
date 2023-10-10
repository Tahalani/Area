import React from "react";
import ReactionsCard from "./reactions.tsx";
import { useServiceContext } from "../../ServiceContext.js";

interface ActionsCardProps {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
}

const Card: React.FC<ActionsCardProps> = ({
  id,
  name,
  args_reaction,
  description,
  serviceId,
}) => {
  const { setService } = useServiceContext();

  const handleServiceClick = () => {
    setService({ id, name, args_reaction, description, serviceId });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <ReactionsCard id={id} name={name} args_reaction={args_reaction} description={description} serviceId={serviceId} />
      </div>
    </div>
  );
};

export default Card;
