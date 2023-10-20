import React, { useState, useEffect } from "react";
import axios from "axios";

const HorizontalRectangle: React.FC = () => {
  const [services, setServices] = useState<string[]>([]);

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

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div>
      {services.map((service, index) => (
        <div
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
          className="mb-12 bg-gray-200 p-4 w-[800px] h-[200px] flex-col justify-start items-start rounded-lg"
        >
          <div key={index} className="w-full h-1/3 flex">
            <div className="w-1/2 flex">
              <div className="w-1/5">
                <div className="w-14 h-14">
                  <img
                    src={service}
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
                  {service}
                </h1>
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-end pr-4">
              <h2
                style={{ fontFamily: "merriweather" }}
                className="text-[25px] text-black"
              >
                {service}
              </h2>
            </div>
          </div>
          {/* <div className="w-full h-2/3 rounded-b-lg mt-4">
              {services.map((service, index) => (
                <p key={index} style={{ fontFamily: 'merriweather'}} className="flex relative text-left text-[20px]">{service}</p>
              ))}
            </div> */}
        </div>
      ))}
    </div>
  );
};

export default HorizontalRectangle;
