import { useState, useEffect } from "react";
import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import Popup from "../Components/ServicePage/popup.tsx";
import Card from "../Components/ServicePage/card.tsx";
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

export default function Service() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }
  const navigate = useNavigate();
  const { selectedService } = useServiceContext();
  const [services, setServices] = useState<ActionData[]>([]);
  const [popupData, setPopupData] = useState<ActionData | null>(null);
  const [connected, setConnected] = useState<string[]>([]);

  const showPopup = (data: ActionData) => {
    setPopupData(data);
  };

  const hidePopup = () => {
    setPopupData(null);
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

  useEffect(() => {
    getConnected();
    getServices();
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
              {selectedService.bottomText}
            </p>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]"
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
        <div className="bg-white h-2/3 w-screen flex flex-col items-center ">
          {popupData && <Popup data={popupData} onClose={hidePopup} />}
          {services && services.length !== 10 && !popupData && (
            <>
              <h1
                style={{ fontFamily: "merriweather" }}
                className="font-semibold text-[30px] text-black pt-[20px] mb-[20px]"
              >
                Area's
              </h1>
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
        </div>
      </div>
    </>
  );
}
