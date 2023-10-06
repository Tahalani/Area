import { Link } from 'react-router-dom';
import Navigationbar from "../Components/navbar.tsx";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

export default function Setting() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { t } = useTranslation();
  const changeLanguageEn = (lng: string) => {
      i18n.changeLanguage(lng);
    };

  return (
    <>
    <Navigationbar/>
      <div className="flex h-screen relative bg-main">
        <div className="w-screen">
          <div className="flex justify-center items-center">
            <h1 style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]">{t("langue")}</h1>
          </div>
          <div className="navbar w-full pt-10 bg-main">
            <div className="navbar-start"></div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal space-x-10 text-gray-900">
                <li>
                  <a style={{ fontFamily: 'merriweather' }} className="text-[30px] border border-black font-bold inline-block">
                    <Link to="/settingPage" onClick={() => changeLanguageEn('fr')}>{t("fr")}</Link>
                  </a>
                </li>
                <li>
                  <a
                    style={{ fontFamily: 'merriweather' }}
                    className="text-[30px] border border-black font-bold inline-block"
                    href="/settingPage"
                    onClick={(e) => { e.preventDefault();
                      changeLanguageEn('en');
                    }}>
                    {t("en")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="navbar-end"></div>
          </div>
        </div>
      </div>
    </>
  );
}
