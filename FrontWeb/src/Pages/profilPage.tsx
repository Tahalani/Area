import Navigationbar from "../Components/navbar.tsx";
import Card from "../Components/ProfilPage/card.tsx";
import HorizontalRectangle from "../Components/ProfilPage/ProfilService.tsx";

export default function Profil() {
  if (localStorage.getItem("token") == null) {
    window.location.href = "/loginPage";
  }

  return (
    <>
      <Navigationbar />
      <div className="flex h-screen relative bg-main">
        <div className="w-1/2 p-6 pt-24 pl-[297px] text-black">
          <Card />
        </div>
        <div
          style={{ overflowY: "scroll", maxHeight: "730px" }}
          className="w-1/2 pt-24 text-black"
        >
          <div className="flex flex-col">
            <HorizontalRectangle />
          </div>
        </div>
      </div>
    </>
  );
}
