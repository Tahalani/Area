import Navigationbar from "../Components/navbar.tsx";
import LanguagesSetting from "../Components/SettingPage/languages.tsx";
import ApkButton from "../Components/SettingPage/apkButton.tsx";

export default function Setting() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  return (
    <>
      <Navigationbar />
      <div className="flex h-screen relative bg-main">
        <div className="w-screen">
          <ApkButton />
          <LanguagesSetting />
        </div>
      </div>
    </>
  );
}
