import Navigationbar from "../Components/navbar.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import { areaData } from "../AreaServiceData.tsx";
import { Button } from 'react-bootstrap';


export default function Area() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }

  const area = areaData.map((item, index) => (
    <ServiceCase
      key={index}
      topImage={item.imageSrc}
      bottomText={item.title}
      linkTo={item.linkTo}
    />
  ));

  const GitHUbConnection = () => {
    window.location.href =
      'http://localhost:8080/api/auth/github?token=' +
      localStorage.getItem('token');
  }

  const MicrosoftConnection = () => {
    window.location.href =
      'http://localhost:8080/api/auth/Microsoft?token=' +
      localStorage.getItem('token');
  }

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative bg-main">
        <div className="w-screen">
          <div className="flex justify-center items-center">
            <h1 style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]">Explore</h1>
          </div>
          <div className="form-control mb-10 mt-5">
            <div className="flex justify-center items-center input-group">
              <input type="text" placeholder="Search…" className="input white-bg" />
              <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>
            <Button style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]" onClick={GitHUbConnection}>GITHUB(Oh le bouton de zinzin)</Button>
            <Button style={{ fontFamily: 'merriweather' }} className="text-[30px] text-black font-bold mt-[80px]" onClick={MicrosoftConnection}>MICROCRO(Oh le bouton de zinzin)</Button>
            <div className="navbar-end"></div>

          </div>
        </div>
        <div className="flex justify-center items-center space-x-10 mb-[2%]">
          {area}
        </div>
        {/* <div className="flex justify-center items-center space-x-10 mb-[2%]">
          <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
          <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
          <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
          <ServiceCase topImage="./src/assets/acer.png" bottomText="Air Monitor" linkTo='/servicePage' />
        </div> */}
      </div>
    </>
  );
}
