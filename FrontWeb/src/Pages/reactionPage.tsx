import React, { useState, useEffect } from 'react';
import Navigationbar from "../Components/navbar.tsx";
import Input from "../Components/ActionPage/input.tsx";
import Parse from "../Components/ActionPage/parse.tsx";
import { useServiceContext } from "../ServiceContext";
import axios from 'axios';

export default function ReactionPage() {
  if (localStorage.getItem('token') == null) {
    window.location.href = '/loginPage';
  }
  const { selectedService } = useServiceContext();
  const parsedItems = Parse(selectedService.args_reaction);
  const [textInputValues, setTextInputValues] = useState<Record<string, string>>({});

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    textInputValues[`${key}`] = event.target.value;
    setTextInputValues({ ...textInputValues });
  }

  const handleSubmit = () => {
    console.log(textInputValues);
    // console.log(selectedService);
  }

  return (
    <>
    <Navigationbar/>
      <div className="h-screen relative">
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
            <button style={{ fontFamily: 'merriweather' }} className="shadow-2xl pl-[30px] pr-[30px] bg-secondary btn-lg text-white rounded-full font-bold mt-[5%]" onClick={handleSubmit}>Submit</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
