import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import Input from "../Components/ActionPage/input.tsx";
import { useServiceContext } from "../ServiceContext";

export default function InArea() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { selectedService } = useServiceContext();

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative">
        <div className="bg-third h-2/4 w-screen">
          <div style={{ fontFamily: 'merriweather' }} className="flex items-center justify-center pt-6 flex-col ">
            <h1 style={{ fontFamily: 'merriweather', lineHeight: '1.2' }} className="mt-0 mb-10 text-[20px] text-black">{selectedService.args_action}</h1>
            <Input placeholder="repo" />
            <Input placeholder="Enter your GitHub username" />
          </div>
        </div>
      </div>
    </>
  );
}
