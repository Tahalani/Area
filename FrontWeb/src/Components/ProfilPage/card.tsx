import pr from "../../assets/pr.png";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";

export default function Card() {

    const { t } = useTranslation();
    const [client, setClient] = useState<any>({});

    const url = import.meta.env.VITE_DNS_NAME + ':8080/api/auth/profile/';
    const getProfile = () => {
      axios.get(url, {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      })
      .then(response => {
        console.log(response.data);
        setClient(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
    }

    useEffect(() => {
      getProfile();
    }, [localStorage.getItem('token')]);

    return (
      <>
        <div style={{ border: '1px solid #1400FF' }} className="bg-[#F3F3F3] rounded-lg h-[80%] w-[70%]">
          <img src={pr} alt="Image" className="rounded-full h-5/12 w-5/12 mx-auto mb-2 mt-10" />
          <p style={{ fontFamily: 'merriweather' }} className="text-black text-[35px] font-semibold text-center">{ client.name } { client.surname }</p>
          <div className="flex bg-[#D9D9D9] rounded-full p-1 ml-[25%] mt-4 w-2/4 justify-center">
            <p style={{ fontFamily: 'merriweather' }} className="text-blue-500 text-[25px] font-semibold">UI/UX</p>
          </div>
          <div className="bg-white text-left rounded-full p-2 mt-6 w-5/6 ml-[8%] pl-[20px]">
            <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">Email</p>
            <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">{ client.email }</p>
          </div>
          <div className="bg-white text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
            <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">{t("name")}</p>
            <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">{ client.name } { client.surname }</p>
          </div>
          <div className="bg-white text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
            <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">{t("phone")}</p>
            <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">06.79.95.80.67</p>
          </div>
        </div>
      </>
    );
  }
