import { useState, useEffect } from "react";
import axios from "axios";
import Navigationbar from "../Components/navbar.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
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

  const [services, setServices] = useState<ServiceData[]>([]);
  const [filteredServices, setFilteredServices] = useState<ServiceData[]>([]);

  const url = import.meta.env.VITE_DNS_NAME + ":8080/api/services/get";

  const getServices = () => {
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
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

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <Navigationbar />
      <div className="h-screen relative bg-main">
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
