import React, { useState, useEffect } from "react";
import axios from "axios";

const HorizontalRectangle: React.FC = () => {
  const [services, setServices] = useState<string[]>([]);
  const [Image, setImage] = useState<
    { name: string; description: string; logo_url: string }[] | undefined
  >(undefined);

  const url =
    import.meta.env.VITE_DNS_NAME +
    ":8080/api/user/services/get?token=" +
    localStorage.getItem("token");

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

  const urlService = import.meta.env.VITE_DNS_NAME + ":8080/api/services/get";

  const getServicesImage = () => {
    axios
      .get(urlService)
      .then((response) => {
        console.log(response.data);
        setImage(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getServices();
    getServicesImage();
  }, []);

  return (
    <div>
      {services.map((service, index) => {
        const serviceData = Image?.find(
          (imgService) => imgService.name === service
        );
        return (
          <div
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
            className="mb-12 bg-gray-200 p-4 w-[800px] h-[300px] flex-col justify-start items-start rounded-lg"
          >
            <div key={index} className="w-full h-1/3 flex">
              <div className="w-1/2 flex">
                <div className="w-1/5">
                  <div className="w-14 h-14">
                    <img
                      src={serviceData?.logo_url}
                      alt="Image"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="w-4/5 ml-auto pt-2">
                  <h1
                    style={{ fontFamily: "merriweather" }}
                    className="text-left text-[30px] text-black"
                  >
                    {serviceData?.name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="w-full h-2/3 rounded-b-lg mt-4">
              <p
                key={index}
                style={{ fontFamily: "merriweather" }}
                className="flex relative text-left text-[20px]"
              >
                {serviceData?.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalRectangle;
