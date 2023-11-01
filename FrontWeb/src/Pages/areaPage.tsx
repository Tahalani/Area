import { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Search from "../Components/AreaPage/search.tsx";
import "../App.css";

type ServiceData = {
  logo_url: string;
  name: string;
  description: string;
  id: number;
};

export default function Area() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);

  const url = import.meta.env.VITE_DNS_NAME + ":8080/api/services/get";

  const getServices = () => {
    axios
      .get(url)
      .then((response) => {
        setServices(response.data);
        setFilteredServices(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const filterServices = (searchValue: string) => {
    const filtered = services.filter((service) =>
      service.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredServices(filtered);
  };
  const redirectToCreationPage = () => {
    navigate("/creationPage");
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      <div className="h-full relative bg-main">
        <button
          style={{ fontFamily: "merriweather" }}
          className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[10px]"
          onClick={redirectToCreationPage}
        >
          {t("creationarea")}
        </button>
        <Search onSearch={filterServices} />
        <div className="grid-container">
          {filteredServices.map((service, index) => (
            <ServiceCase
              key={index}
              topImage={service.logo_url}
              bottomText={service.name}
              description={service.description}
              serviceId={service.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
