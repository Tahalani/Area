import React, { useRef, useState, useEffect } from "react";
import Parse from "../ActionPage/parse.js";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
  data: ReactionData | null;
  onClose: () => void;
  onServiceCreated: (message: string) => void;
}

type ServiceData = {
  id: number;
  name: string;
  description: string;
  logo_url: string;
};

const PopupReaction: React.FC<PopupProps> = ({ data, onClose, onServiceCreated }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [check, setCheck] = useState(1);
  const { t } = useTranslation();

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };
  const closeModal = () => {
    onClose();
  };

  const parsedReactions = data ? Parse(data.args_reaction) : null;
  const [textInputReaction, setTextInputReaction] = useState<Record<string, string>>({});
  const [actions, setActions] = useState<ActionData[]>([]);
  const [textInputAction, setTextInputAction] = useState<Record<string, string>>({});
  const [parsedActions, setParsedActions] = useState<Record<string, string>[]>([]);
  const [selectedAction, setSelectedAction] = useState<ActionData | null>(null);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTextReactionChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputReaction[key] = event.target.value;
    setTextInputReaction({ ...textInputReaction });
  }
  const handleTextActionChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputAction[key] = event.target.value;
    setTextInputAction({ ...textInputAction });
  }
  const addReaction = () => {
    setCheck(2);
  }

  const handleActionButtonClick = (action: ActionData) => {
    setSelectedAction(action);
    setParsedActions(Parse(action.args_action));
    setCheck(4);
  }

  const handleServiceButtonClick = (service: ServiceData) => {
    setSelectedService(service);
    setCheck(3);
  }

  const backFirst = () => {
    setTextInputReaction({});
    setCheck(1);
  }

  const backSecondary = () => {
    setSelectedService(null)
    setCheck(2);
  }

  const backThird = () => {
    setSelectedAction(null);
    setTextInputAction({});
    setParsedActions([]);
    setCheck(3);
  }

  const getActions = () => {
    axios.get(import.meta.env.VITE_DNS_NAME + ':8080/api/actions/get?serviceId=' + selectedService?.id)
      .then(response => {
        setActions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  }

  const getServices = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/services/get")
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getServices();
    if (errorMessage) {
      closeModal();
    }
    if (check === 3) {
      getActions();
    }
  }, [check, errorMessage]);

  const createArea = () => {
    if (!data) {
      return;
    }

    const objReaction: Record<string, string> = {};
    Object.keys(textInputReaction).map((key) => {
      objReaction[key] = textInputReaction[key];
    });
    const objAction: Record<string, string> = {};
    Object.keys(textInputAction).map((key) => {
      objAction[key] = textInputAction[key];
    });

    axios
      .post(import.meta.env.VITE_DNS_NAME + ':8080/api/area/create', {
        id_Action: selectedAction?.id,
        id_Reaction: data.id,
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
        if (response.status === 201) {
          onServiceCreated("Your Area has been created !");
          setErrorMessage("Area Created");
        }
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
      <button className="btn mt-[20px] bg-secondary text-white" onClick={openModal}>{t("completeinformation")}</button>
      {data && (
        <dialog ref={modalRef} className="modal">
          <div className="modal-box bg-grey-300">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
            </form>
            <div>

            {check === 1 && (
            <div>
              <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">Reaction</h1>
              <ul>
                {parsedReactions && parsedReactions.map((item, index) => (
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
              <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={addReaction}>{t("next")}</button>
            </div>
            )}

            {check === 2 && (
            <div>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2" onClick={backFirst}>-</button>
              </form>
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
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2" onClick={backSecondary}>-</button>
                </form>
                <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">{t("actionchoice")}</h1>
                {actions.map((action, index) => (
                <div key={index}>
                  <button className="w-[80%] btn btn-outline btn-sm mb-2" onClick={() => handleActionButtonClick(action)}>{action.name}</button>
                </div>
              ))}
              </div>
            )}

          </div>
          <div>
          {check === 4 && (
            <div>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2" onClick={backThird}>-</button>
              </form>
              <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-white mb-[20px]">{t("action")}</h1>
              <ul>
                {parsedActions && parsedActions.map((item: any, index: any) => (
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
              <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={handleSubmit} >{t("submit")}</button>
            </div>
            )}
          </div>
        </div>
        </dialog>
      )}
    </>
  );
};

export default PopupReaction;
