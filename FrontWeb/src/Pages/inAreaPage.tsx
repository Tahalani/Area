import Navigationbar from "../Components/ServicePage/ServiceNavBar.tsx";
import Input from "../Components/ActionPage/input.tsx";
import Parse from "../Components/ActionPage/parse.tsx";
import { useServiceContext } from "../ServiceContext";

export default function InArea() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { selectedService } = useServiceContext();
  const parsedItems = Parse(selectedService.args_action);

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative">
        <div className="bg-third h-2/4 w-screen">
          <div style={{ fontFamily: 'merriweather' }} className="flex items-center justify-center pt-6 flex-col ">
            <div>
            <ul>
              {parsedItems.map((item, index) => (
                <li key={index}>
                  {Object.keys(item).map((key) => (
                    <p key={key}>
                      <Input placeholder={item[key]} />
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
