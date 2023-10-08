import React from "react";
import ActionsCard from "./actions.tsx";
import { useServiceContext } from "../../ServiceContext.js";

interface ActionsCardProps {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
}

const Card: React.FC<ActionsCardProps> = ({
  id,
  name,
  args_action,
  description,
  serviceId,
}) => {
  const { setService } = useServiceContext();

  const handleServiceClick = () => {
    setService({ id, name, args_action, description, serviceId });
  };

  return (
    <div>
      <div onClick={handleServiceClick}>
        <ActionsCard id={id} name={name} args_action={args_action} description={description} serviceId={serviceId} />
      </div>
    </div>
  );
};

export default Card;
