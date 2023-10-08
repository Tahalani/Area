import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigationbar from "../Components/navbar.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import Search from "../Components/AreaPage/search.tsx";
import { areaData } from "../AreaServiceData.tsx";

type ServiceData = {
  logo_url: string;
  name: string;
  description: string;
};

export default function Area() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }

  const [services, setServices] = useState<ServiceData[]>([]);

  const getServices = () => {
    axios.get('http://localhost:8080/About.json')
      .then(response => {
        console.log(response.data.server.services);
        setServices(response.data.server.services);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <Navigationbar />
      <div className="h-screen relative bg-main">
        <Search />
        <div className="flex justify-center items-center space-x-10 mb-[2%]">
          {services.map((service, index) => (
            <ServiceCase
              key={index}
              topImage={service.logo_url}
              bottomText={service.name}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
