import Navigationbar from "../Components/navbar.tsx";
import ServiceCase from "../Components/AreaPage/service.tsx";
import Search from "../Components/AreaPage/search.tsx";
import { areaData } from "../AreaServiceData.tsx";

export default function Area() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }

  const area = areaData.map((item, index) => (
    <ServiceCase
      key={index}
      topImage={item.logo_url}
      bottomText={item.name}
      linkTo={item.linkTo}
    />
  ));

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative bg-main">
        <Search />
        <div className="flex justify-center items-center space-x-10 mb-[2%]">
          {area}
        </div>
      </div>
    </>
  );
}
