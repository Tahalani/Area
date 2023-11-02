import { useState, useEffect } from "react";
import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import Popup from "../Components/ServicePage/popup.tsx";
import PopupReaction from "../Components/ServicePage/popupReaction.tsx";
import Card from "../Components/ServicePage/card.tsx";
import CardReaction from "../Components/ServicePage/cardReaction.tsx";
import { useServiceContext } from "../ServiceContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type ActionData = {
  id: number;
  name: string;
  args_action: string;
  description: string;
  serviceId: number;
};

export type ReactionData = {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
};

export default function Service() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }
  const navigate = useNavigate();
  const { selectedService } = useServiceContext();
  const [services, setServices] = useState<ActionData[]>([]);
  const [popupData, setPopupData] = useState<ActionData | null>(null);
  const [popupDataReaction, setPopupDataReaction] = useState<ReactionData | null>(null);
  const [connected, setConnected] = useState<string[]>([]);
  const [reactions, setReactions] = useState<ReactionData[]>([]);

  const showPopup = (data: ActionData) => {
    setPopupData(data);
  };

  const showPopupReaction = (data: ReactionData) => {
    setPopupDataReaction(data);
  };

  const hidePopup = () => {
    setPopupData(null);
  };

  const hidePopupReaction = () => {
    setPopupDataReaction(null);
  };

  const AccountConnection = () => {
    window.location.href =
      import.meta.env.VITE_DNS_NAME +
      ":8080/api/auth/" +
      selectedService.bottomText +
      "?token=" +
      localStorage.getItem("token");
    navigate("/servicePage");
  };

  const url =
    import.meta.env.VITE_DNS_NAME +
    ":8080/api/actions/get?serviceId=" +
    selectedService.serviceId;

  const getServices = () => {
    axios
      .get(url)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

const getConnected = () => {
  axios
    .get(import.meta.env.VITE_DNS_NAME + ":8080/api/user/services/get?token=" + localStorage.getItem("token"))
    .then((response) => {
      setConnected(response.data);
    })
    .catch((error) => {
      console.error("Erreur lors de la requête :", error);
    });
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const [serviceMessage, setServiceMessage] = useState<string>("");

const handleServiceCreated = (message: string) => {
  setServiceMessage(message);
  setTimeout(() => {
    setServiceMessage("");
  }, 3000);
};

const getReactions = () => {
  axios.get(import.meta.env.VITE_DNS_NAME + ':8080/api/reactions/get?serviceId=' + selectedService?.serviceId)
  .then(response => {
    setReactions(response.data);
  })
  .catch(error => {
    console.error('Erreur lors de la requête :', error);
  });
}

useEffect(() => {
  getConnected();
  getServices();
  getReactions();
}, []);

  return (
    <>
      <Navigationbar />
      <div className="h-screen relative">
        <div className="bg-third h-2/4 w-screen">
          <div
            style={{ fontFamily: "merriweather" }}
            className="flex items-center justify-center h-1/2 pt-8"
          >
            <img
              src={selectedService.topImage}
              alt="Image en haut"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="">
            <p
              style={{ fontFamily: "merriweather", lineHeight: "1.2" }}
              className="mt-2 mb-2 text-[30px] text-purple-100"
            >
              {capitalizeFirstLetter(selectedService.bottomText)}
            </p>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[5%]"
              onClick={() => {
                if (!connected.includes(selectedService.bottomText)) {
                  AccountConnection();
                }
              }}
            >
              {connected.includes(selectedService.bottomText) ? "Connected" : "Connect"}
            </button>
          </div>
        </div>
        <div className="bg-white h-2/3 w-screen flex flex-col items-center">
          {serviceMessage && (
            <div className="alert alert-success text-[20px] text-white text-center font-bold flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{serviceMessage}</span>
            </div>
          )}
          {!popupData && !popupDataReaction && (
            <h1
              style={{ fontFamily: "merriweather" }}
              className="font-semibold text-[30px] text-black pt-[20px] mb-[20px]"
            >
              Area's
            </h1>
          )}
          {popupData && <Popup data={popupData} onClose={hidePopup} onServiceCreated={handleServiceCreated} />}
          {popupDataReaction && <PopupReaction data={popupDataReaction} onClose={hidePopupReaction} onServiceCreated={handleServiceCreated} />}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Array.isArray(services) && services.length > 0 && !popupData && !popupDataReaction && (
              <>
                {services.map((service, index) => (
                  <Card
                    key={index}
                    id={service.id}
                    name={service.name}
                    args_action={service.args_action}
                    description={service.description}
                    serviceId={service.serviceId}
                    onCardClick={showPopup}
                  />
                ))}
              </>
            )}
            {!popupDataReaction && Array.isArray(reactions) && reactions.length > 0 && !popupData && (
              <>
                {reactions.map((reaction, index) => (
                  <CardReaction
                    key={index}
                    id={reaction.id}
                    name={reaction.name}
                    args_reaction={reaction.args_reaction}
                    description={reaction.description}
                    serviceId={reaction.serviceId}
                    onCardClick={showPopupReaction}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        </div>
    </>
  );
}
