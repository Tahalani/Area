import Navigationbar from "../Components/navbar.tsx";
import Card from "../Components/ProfilPage/card.tsx";
import HorizontalRectangle from "../Components/ProfilPage/ProfilService.tsx";
import NavigationbarMd from "../Components/navbarMd.tsx";

export default function Profil() {
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
      <div className="flex sm:h-full lg:h-screen md:h-full relative bg-main sm:flex-col md:flex-col lg:flex-row">
        <div className="sm:w-full lg:w-1/2 p-6 pt-24 sm:pl-[99px] md:pl-[198px] lg:pl-[297px] text-black">
          <Card />
        </div>
        <div className="lg:overflow-y-auto lg:max-h-[640px] lg:w-1/2 text-black mt-[95px]">
          <div className="flex flex-col p-[10px]">
            <HorizontalRectangle />
          </div>
        </div>
      </div>
    </>
  );
}
