import Navigationbar from "../Components/navbar.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";
import LanguagesSetting from "../Components/SettingPage/languages.tsx";
import ApkButton from "../Components/SettingPage/apkButton.tsx";

export default function Setting() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  return (
    <>
      <div className="hidden lg:block">
        <Navigationbar />
      </div>
      <div className="lg:hidden">
        <NavigationbarMd />
      </div>
      <div className="flex h-screen relative bg-main">
        <div className="w-screen">
          <ApkButton />
          <LanguagesSetting />
        </div>
      </div>
    </>
  );
}
