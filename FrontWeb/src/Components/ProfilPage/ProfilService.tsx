import React from 'react';
import axios from 'axios';

const authSpotify = () => {
  window.location.href = import.meta.env.VITE_DNS_NAME + ':8080/api/auth/spotify' + '?token=' + localStorage.getItem('token');
}

interface HorizontalRectangleProps {
  name: string;
  secondTitle: string;
  description: string;
  logo_url: string;
}

const HorizontalRectangle: React.FC<HorizontalRectangleProps> = ({
  name,
  secondTitle,
  description,
  logo_url,
}) => {

  return (
    <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }} className="mb-12 bg-gray-200 p-4 w-[800px] h-[200px] flex-col justify-start items-start rounded-lg">
      <div className="w-full h-1/3 flex">
        <div className="w-1/2 flex">
          <div className="w-1/5">
            <div className="w-14 h-14">
              <button onClick={authSpotify} className="w-full h-full rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"> Connect Spotify </button>
              <img src={logo_url} alt="Image" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="w-4/5 ml-auto pt-2">
            <h1 style={{ fontFamily: 'merriweather' }} className="text-left text-[30px] text-black">{name}</h1>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-end pr-4">
          <h2 style={{ fontFamily: 'merriweather' }} className="text-[25px] text-black">{secondTitle}</h2>
        </div>
      </div>
      <div className="w-full h-2/3 rounded-b-lg mt-4">
        <p style={{ fontFamily: 'merriweather'}} className="flex relative text-left text-[20px]">{description}</p>
      </div>
    </div>
  );
};

export default HorizontalRectangle;
