import { useTranslation } from "react-i18next";
import pr from "../assets/pr.png";
import Navigationbar from "../Components/navbar.tsx";
import HorizontalRectangle from "../Components/ProfilPage/ProfilService.tsx";
import { horizontalRectangleData } from "../ProfilServiceData.tsx";

export default function Profil() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { t } = useTranslation();
  const horizontalRectangles = horizontalRectangleData.map((item, index) => (
    <HorizontalRectangle
      key={index}
      title={item.title}
      secondTitle={item.secondTitle}
      imageSrc={item.imageSrc}
      description={item.description}
    />
  ));

  return (
    <>
      <Navigationbar />
      <div className="flex h-screen relative bg-main">
        <div className="w-1/2 p-6 pt-24 pl-[297px] text-black">
          <div style={{ border: '1px solid #1400FF' }} className="bg-[#F3F3F3] rounded-lg h-[80%] w-[70%]">
            <img src={pr} alt="Image" className="rounded-full h-5/12 w-5/12 mx-auto mb-2 mt-10" />
            <p style={{ fontFamily: 'merriweather' }} className="text-black text-[35px] font-semibold text-center">Ines Regad</p>
            <div className="flex bg-[#D9D9D9] rounded-full p-1 ml-[25%] mt-4 w-2/4 justify-center">
              <p style={{ fontFamily: 'merriweather' }} className="text-blue-500 text-[25px] font-semibold">UI/UX</p>
            </div>
            <div className="bg-white text-left rounded-full p-2 mt-6 w-5/6 ml-[8%] pl-[20px]">
              <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">Email</p>
              <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">Djmehde@gmail.com</p>
            </div>
            <div className="bg-white text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
              <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">{t("name")}</p>
              <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">Ines Regad</p>
            </div>
            <div className="bg-white text-left rounded-full p-2 mt-4 w-5/6 ml-[8%] pl-[20px]">
              <p style={{ fontFamily: 'merriweather' }} className="text-[#4A4949] pl-[3%] text-[12px] font-semibold">{t("phone")}</p>
              <p style={{ fontFamily: 'Inter' }} className="text-[#000000] pl-[3%] text-[20px]">06.79.95.80.67</p>
            </div>
          </div>
        </div>
        <div style={{ overflowY: 'scroll', maxHeight: '730px' }} className="w-1/2 pt-24 text-black">
          <div className="flex flex-col">
            {horizontalRectangles}
          </div>
        </div>
      </div>
    </>
  );
}
