import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import { useServiceContext } from "../ServiceContext";
import axios from 'axios';

export default function Service() {
  const { selectedService } = useServiceContext();
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  console.log(localStorage.getItem('token'));
  const GitHUbConnection = () => {
    window.location.href =
      'http://884d1376-a185-41a0-a373-f1359376749e.pub.instances.scw.cloud:8080/api/auth/github?token=' +
      localStorage.getItem('token');
  }

  const createArea = () => {
    console.log("createArea")
    axios.post('http://884d1376-a185-41a0-a373-f1359376749e.pub.instances.scw.cloud:8080/api/area/create', {
      token: localStorage.getItem('token'),
      id_Action: 1,
      id_Reaction: 2,
      argsAction: {
        repo: "areaTest",
      },
      argsReaction: {
        repo: "areaTest",
        title: "test",
        body: "test",
        head: "test",
        base: "main",
        maintainer_can_modify: true
      },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête :', error);
    });
  }

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative">
        <div className="bg-third h-2/3 w-screen">
          <div style={{ fontFamily: 'merriweather', height: "50%", display: "flex", alignItems: "center", justifyContent: "center" }} className="pt-8">
            <img src={selectedService.topImage} alt="Image en haut" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
          <div className="">
            <p style={{ fontFamily: 'merriweather', lineHeight: '1.2' }} className="mt-2 mb-2 text-[30px] text-black">{selectedService.bottomText}</p>
            <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={GitHUbConnection}>Connect</button>
            <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={createArea}>Create AreaAAAAAAAA</button>
          </div>
        </div>
        <div className="bg-white h-2/3 w-screen">
          <h1 style={{ fontFamily: 'merriweather' }} className="font-semibold text-[30px] text-black pt-[20px] mb-[20px]">Services</h1>
          <div className="flex justify-center items-center space-x-10 mb-[2%]">
            <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
            <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
          </div>
        </div>
      </div>
    </>
  );
}
