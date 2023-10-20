import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ServiceNavbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/loginPage");
  };

  return (
    <>
      <div className="w-screen">
        <div className="navbar w-full pt-10 bg-third">
          <div className="navbar-start">
            <a
              style={{ fontFamily: "Londrina" }}
              className="text-[40px] ml-[132px] text-black"
            >
              <Link to="/areaPage">NetQ.</Link>
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal space-x-10 text-gray-900">
              <li>
                <a
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  <Link to="/areaPage">Services</Link>
                </a>
              </li>
              <li>
                <a
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  <Link to="/profilPage">{t("profil")}</Link>
                </a>
              </li>
              <li>
                <a
                  style={{ fontFamily: "merriweather" }}
                  className="text-[25px]"
                >
                  <Link to="/settingPage">{t("setting")}</Link>
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a
              style={{ fontFamily: "merriweather" }}
              className="pl-[30px] pr-[30px] bg-secondary btn mr-36 text-white rounded-full font-bold"
              onClick={redirectToLoginPage}
            >
              {t("Logout")}
            </a>
          </div>
        </div>
      </div>
      <div className="bg-third h-0.5">
        <div className="w-1/4 ml-[37%] border-2 border-black"></div>
      </div>
    </>
  );
}

export default ServiceNavbar;
