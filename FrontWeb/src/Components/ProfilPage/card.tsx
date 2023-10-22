import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function Card() {
  const { t } = useTranslation();
  const [client, setClient] = useState<any>({});

  const url = import.meta.env.VITE_DNS_NAME + ":8080/api/auth/profile/";
  const getProfile = () => {
    axios
      .get(url, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setClient(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  useEffect(() => {
    getProfile();
  }, [localStorage.getItem("token")]);

  return (
    <>
      <div
        style={{ border: "1px solid #1400FF" }}
        className="bg-[#F3F3F3] rounded-lg h-[80%] w-[70%]"
      >
        <div className="rounded-full h-[200px] w-[200px] mx-auto mb-4 mt-12 flex items-center justify-center bg-gray-300 text-gray-600 text-[70px] font-semibold">
          {client.name ? client.name.charAt(0) : ""}
        </div>
        {client.surname !== "undefined" ? (
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-black text-[35px] font-semibold text-center"
          >
            {client.name} {client.surname}
          </p>
        ) : (
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-black text-[35px] font-semibold text-center"
          >
            {client.name}
          </p>
        )}
        <div className="flex bg-[#D9D9D9] rounded-full p-1 ml-[25%] mt-8 w-2/4 justify-center">
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-blue-500 text-[25px] font-semibold"
          >
            Connected
          </p>
        </div>
        <div className="bg-white text-left rounded-full p-2 mt-12 w-5/6 ml-[8%] pl-[20px]">
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-[#4A4949] pl-[3%] text-[12px] font-semibold"
          >
            Email
          </p>
          <p
            style={{ fontFamily: "Inter" }}
            className="text-[#000000] pl-[3%] text-[20px]"
          >
            {client.email}
          </p>
        </div>
        <div className="bg-white text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
          <p
            style={{ fontFamily: "merriweather" }}
            className="text-[#4A4949] pl-[3%] text-[12px] font-semibold"
          >
            {t("name")}
          </p>
          {client.surname !== "undefined" ? (
            <p
              style={{ fontFamily: "Inter" }}
              className="text-[#000000] pl-[3%] text-[20px]"
            >
              {client.name} {client.surname}
            </p>
          ) : (
            <p
              style={{ fontFamily: "Inter" }}
              className="text-[#000000] pl-[3%] text-[20px]"
            >
              {client.name}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
