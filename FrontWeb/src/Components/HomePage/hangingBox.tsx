import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HangingBox() {
  const { t } = useTranslation();
  const navigate = useNavigate();

    const redirectToLoginPage = () => {
        navigate("/LoginPage");
      };
    return (
      <>
        <div className="w-2/3 p-6 text-left pt-16 text-black pl-[132px]">
          <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[75px]">{t("WelcomeMsg2")}</h1>
          <p style={{ fontFamily: 'merriweather', lineHeight: '1.2' }} className="text-3xl mt-8 mb-4 text-[42px]">{t("HangingBox")}</p>
          <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white mt-4 rounded-full font-bold" onClick={redirectToLoginPage}>Try NetQ.</button>
        </div>
      </>
    );
  }
  