import Navigationbar from "../Components/navbar.tsx";
import Input from "../Components/ActionPage/input.tsx";
import Parse from "../Components/ActionPage/parse.tsx";
import { useServiceContext } from "../ServiceContext";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from "../Components/ActionPage/card.tsx";

type ReactionData = {
  id: number;
  name: string;
  args_reaction: string;
  description: string;
  serviceId: number;
};

export default function InArea() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { selectedService } = useServiceContext();
  const [reactions, setReactions] = useState<ReactionData[]>([]);
  const parsedItems = Parse(selectedService.args_action);
  const [textInputValues, setTextInputValues] = useState<Record<string, string>>({});

  const url = import.meta.env.VITE_DNS_NAME + ':8080/api/reactions/get';
  const getReactions = () => {
    axios.get(url)
      .then(response => {
        setReactions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la requête :', error);
      });
  }

  useEffect(() => {
    getReactions();
  }, []);


  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputValues[`${key}`] = event.target.value;
    setTextInputValues({ ...textInputValues });
  }

  const handleSubmit = () => {
    console.log(textInputValues);
  }

  return (
    <>
    <Navigationbar/>
      <div className="bg-main h-screen relative">
        <div className="bg-main h-2/4 w-screen">
          <div style={{ fontFamily: 'merriweather' }} className="flex items-center justify-center pt-6 flex-col ">
            <div>
            <ul>
              {parsedItems.map((item, index) => (
                <li key={index}>
                  {Object.keys(item).map((key) => (
                    <p key={key}>
                      <input
                        key={index}
                        type="text"
                        value={textInputValues[`${key}`]}
                        className="mb-6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        onChange={(event) => handleTextInputChange(event, key)}
                        placeholder={item[key]}
                      />
                    </p>
                  ))}
                </li>
              ))}
            </ul>
            <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={handleSubmit} >Submit</button>
          </div>
          </div>
        </div>
        <div className="bg-main flex justify-center items-center space-x-10 mb-[2%]">
          {reactions.map((reaction, index) => (
            <Card
              key={index}
              id={reaction.id}
              name={reaction.name}
              args_reaction={reaction.args_reaction}
              description={reaction.description}
              serviceId={reaction.serviceId}
            />
          ))}
          </div>
      </div>
    </>
  );
}
