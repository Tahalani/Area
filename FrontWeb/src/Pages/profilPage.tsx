import Navigationbar from "../Components/navbar.tsx";
import Card from "../Components/ProfilPage/card.tsx";
import HorizontalRectangle from "../Components/ProfilPage/ProfilService.tsx";
import { horizontalRectangleData } from "../ProfilServiceData.tsx";


export default function Profil() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }

  const horizontalRectangles = horizontalRectangleData.map((item, index) => (
    <HorizontalRectangle
      key={index}
      name={item.name}
      secondTitle={item.secondTitle}
      logo_url={item.logo_url}
      description={item.description}
    />
  ));

  return (
    <>
      <Navigationbar />
      <div className="flex h-screen relative bg-main">
        <div className="w-1/2 p-6 pt-24 pl-[297px] text-black">
          <Card />
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
