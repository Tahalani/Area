import { useTranslation } from "react-i18next";

export default function ModeSetting() {
  const { t } = useTranslation();

  const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
  };

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 style={{ fontFamily: "merriweather" }} className="text-[30px] text-black dark:text-white font-bold mt-[80px]">Mode</h1>
      </div>
      <div className="navbar w-full pt-10 bg-main dark:bg-slate-800">
        <div className="navbar-start"></div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-10 text-gray-900">
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[20px]"
              onClick={enableDarkMode}
            >
              {t("sombre")}
            </button>
            <button
              style={{ fontFamily: "merriweather" }}
              className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn btn-lg text-white rounded-full font-bold mt-[20px]"
              onClick={disableDarkMode}
            >
              {t("clair")}
            </button>
          </ul>
        </div>
        <div className="navbar-end"></div>
      </div>
    </>
  );
}
