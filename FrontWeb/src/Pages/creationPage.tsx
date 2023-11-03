import { useEffect, useState } from "react";
import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DeleteCard from "../Components/CreationPage/popupDelete.tsx";

interface Area {
  id: number;
  actionId: number;
  actionName: string;
  areaId: number;
  reactionId: number;
  reactionName: string;
}

interface Service {
  id: number;
  name: string;
  logo_url: string;
}

export default function Creation() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  const navigate = useNavigate();
  const [areaData, setAreaData] = useState<Area[]>([]);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const { t } = useTranslation();
  const [check, setCheck] = useState(1);

  const getAreaCreated = () => {
    axios
      .get(
        import.meta.env.VITE_DNS_NAME +
          ":8080/api/areas/get?token=" +
          localStorage.getItem("token")
      )
      .then((response) => {
        setAreaData(response.data);
        console.log("test = ", response.data);
        if (!Array.isArray(response.data)) {
          setCheck(2);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const getServicesImage = () => {
    axios
      .get(import.meta.env.VITE_DNS_NAME + ":8080/api/services/get")
      .then((response) => {
        setServicesData(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getAreaCreated();
    getServicesImage();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      {check === 1 && (
      <div className="bg-main h-screen">
        <h1 className="font-bold text-[30px] text-black p-[40px]">{t("creationarea")}</h1>
        <div style={{ margin: "0 20%" }} className="bg-blue-100 pt-[30px] pb-[30px] pl-[10px] pr-[10px]">
          <ul>
            {areaData.map((item, index) => (
              <li key={index}>
                <div className="flex space-x-4 m-[10px]">
                <div className="flex-1 flex text-left justify-center items-center flex-row bg-secondary p-4 text-white rounded-md relative">
                    <div className="w-1/5">
                      {servicesData.find(service => service.id === item.actionId)?.logo_url && (
                        <img
                          src={servicesData.find(service => service.id === item.actionId)?.logo_url}
                          alt={servicesData.find(service => service.id === item.actionId)?.name}
                          className="w-12 h-12 mr-4"
                        />
                      )}
                    </div>
                    <div className="w-4/5 text-[20px] font-bold">
                      {item.actionName}
                    </div>
                  </div>
                  {/* <div className="text-4xl text-blue-500 flex items-center">
                    &#10148;
                  </div> */}
                  <DeleteCard areaMap={item} />
                  <div className="flex-1 flex text-left justify-center items-center flex-row bg-secondary p-4 text-white rounded-md">
                    <div className="w-1/5">
                      {servicesData.find(service => service.id === item.reactionId)?.logo_url && (
                        <img
                          src={servicesData.find(service => service.id === item.reactionId)?.logo_url}
                          alt={servicesData.find(service => service.id === item.reactionId)?.name}
                          className="w-12 h-12 mr-4"
                        />
                      )}
                    </div>
                    <div className="w-4/5 text-[20px] font-bold">
                      {item.reactionName}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}
      {check === 2 && (
        <div className="bg-main h-screen">
          <h1 className="font-bold text-[30px] text-black p-[40px]">{t("creationarea")}</h1>
          <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[5%]"
              onClick={() => {navigate("/areaPage")}}
            >
              {t("creationareabutton")}
            </button>
        </div>
      )}
    </>
  );
}
