import React, { useRef, useState, useEffect } from "react";
import Parse from "../ActionPage/parse.tsx";
import axios from "axios";

type ActionData = {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
};

type ReactionData = {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
};

interface PopupProps {
  data: ActionData | null;
  onClose: () => void;
}

type ServiceData = {
  id: number;
  name: string;
  description: string;
  logo_url: string;
};

const Popup: React.FC<PopupProps> = ({ data, onClose }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [check, setCheck] = useState(1);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    onClose();
  };

  const parsedActions = data ? Parse(data.args_action) : null;
  const [textInputAction, setTextInputAction] = useState<Record<string, string>>({});
  const [reactions, setReactions] = useState<ReactionData[]>([]);
  const [textInputReaction, setTextInputReaction] = useState<Record<string, string>>({});
  const [parsedReactions, setParsedReactions] = useState<Record<string, string>[]>([]);
  const [selectedReaction, setSelectedReaction] = useState<ReactionData | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  const handleTextActionChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputAction[key] = event.target.value;
    setTextInputAction({ ...textInputAction });
  }
  const handleTextReactionChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputReaction[key] = event.target.value;
    setTextInputReaction({ ...textInputReaction });
  }
  const addAction = () => {
    setCheck(2);
  }

  const handleReactionButtonClick = (reaction: ReactionData) => {
    setSelectedReaction(reaction);
    setParsedReactions(Parse(reaction.args_reaction));
    setCheck(4);
  }

  const handleServiceButtonClick = (service: ServiceData) => {
    setSelectedService(service);
    setCheck(3);
  }

  const getReactions = () => {
    axios.get(import.meta.env.VITE_DNS_NAME + ':8080/api/reactions/get?serviceId=' + selectedService?.id)
      .then(response => {
        console.log("service sel = ", selectedService);
        setReactions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  }

  const getServices = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/services/get")
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getServices();
    if (check === 3) {
      getReactions();
    }
  }, [check]);

  const createArea = () => {
    if (!data) {
      return;
    }

    const objAction: Record<string, string> = {};
    Object.keys(textInputAction).map((key) => {
      objAction[key] = textInputAction[key];
    });
    const objReaction: Record<string, string> = {};
    Object.keys(textInputReaction).map((key) => {
      objReaction[key] = textInputReaction[key];
    });

    axios
      .post(import.meta.env.VITE_DNS_NAME + ':8080/api/area/create', {
        id_Action: data.id,
        id_Reaction: selectedReaction?.id,
        argsAction: {
          ...objAction,
        },
        argsReaction: {
          ...objReaction,
          maintainer_can_modify: true,
        },
      }, {headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requete :", error);
      });
  };

  const handleSubmit = () => {
    createArea();
  };

  return (
    <>
      <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-black m-[30px]">{data?.description}</h1>
      <button className="btn mt-[20px]" onClick={openModal}>Complete Informations</button>
      {data && (
        <dialog ref={modalRef} className="modal">
          <div className="modal-box bg-grey-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
            </form>
            <div>

            {check === 1 && (
            <div>
              <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">Action</h1>
              <ul>
                {parsedActions && parsedActions.map((item, index) => (
                  <li key={index}>
                    {Object.keys(item).map((key) => (
                      <p key={key}>
                        <input
                          key={index}
                          type="text"
                          value={textInputAction[`${key}`]}
                          className="mb-6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                          onChange={(event) => handleTextActionChange(event, key)}
                          placeholder={item[key]}
                        />
                      </p>
                    ))}
                  </li>
                ))}
              </ul>
              <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={addAction}>Next</button>
            </div>
            )}

            {check === 2 && (
            <div>
              <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">Services</h1>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <button className="w-[80%] btn btn-outline btn-sm mb-2" onClick={() => handleServiceButtonClick(service)}>{service.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            )}

            {check === 3 && (
              <div>
                <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">Reaction Choice</h1>
                {reactions.map((reaction, index) => (
                <div key={index}>
                  <button className="w-[80%] btn btn-outline btn-sm mb-2" onClick={() => handleReactionButtonClick(reaction)}>{reaction.name}</button>
                </div>
              ))}
              </div>
            )}

          </div>
          <div>
          {check === 4 && (
            <div>
            <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">Reaction</h1>
            <ul>
              {parsedReactions && parsedReactions.map((item: any, index: any) => (
                <li key={index}>
                  {Object.keys(item).map((key) => (
                    <p key={key}>
                      <input
                        key={index}
                        type="text"
                        value={textInputReaction[`${key}`]}
                        className="mb-6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        onChange={(event) => handleTextReactionChange(event, key)}
                        placeholder={item[key]}
                      />
                    </p>
                  ))}
                </li>
              ))}
            </ul>
            <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={handleSubmit} >Submit</button>
            </div>
            )}
          </div>
        </div>
        </dialog>
      )}
    </>
  );
};

export default Popup;
