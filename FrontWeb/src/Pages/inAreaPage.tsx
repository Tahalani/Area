import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import { useServiceContext } from "../ServiceContext";

export default function InArea() {
  const { selectedService } = useServiceContext();
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative">
        <div className="bg-third h-2/4 w-screen">
          <div style={{ fontFamily: 'merriweather', display: "flex", alignItems: "center", justifyContent: "center" }} className="pt-6">
            <h1 style={{ fontFamily: 'merriweather', lineHeight: '1.2' }} className="mt-0 mb-2 text-[50px] text-black">{selectedService.bottomText}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
