import loginImage from "../assets/login.jpg";
import { useNavigate } from "react-router-dom";
import GoogleConnexion from "../Components/LoginPage/googleConnexion.tsx";
import InputConnexion from "../Components/LoginPage/inputConnexion.tsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const getClientToken = (
    email: string,
    password: string
  ) => {
    const data = {
      email: email,
      password: password
    };
    console.log(data);
    const url = 'https://are4-51.com:8080/api/auth/login/';
  
    axios.post(url, data)
    .then(response => {
        localStorage.setItem('token', response.data.access_token);
        setErrorMessage('');
        navigate('/profilPage');
    })
    .catch(error => {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
      console.error('Erreur lors de la requête :', error);
    });
  };
  return (
    <>
      <div className="flex bg-white flex-col h-screen lg:flex-row">
        <div className="flex-grow w-1/2 bg-white card rounded-box place-items-center mt-[120px]">
          <div className="w-1/2 bg-white card rounded-box place-items-center">
            <button style={{ fontFamily: 'Arial' }}
              className="btn btn-active text-white"
              onClick={() => navigate('/registerPage')}
              >
              {t("register")}
            </button>
          </div>
          <h1 style={{ fontFamily: 'merriweather' }} className="text-[75px] font-bold text-black">{t("WelcomeMsg")}</h1>
          <p style={{ fontFamily: 'merriweather' }} className="text-[20px]">
            {t("CatchPhrase")}
          </p>
          <div className="form-control w-1/2 max-w-xl mt-10"></div>
          <InputConnexion text="Email" setVar={setEmail}/>
          <div className="form-control w-full max-w-xl mt-10">
            <label className="label">
              <span style={{ fontFamily: 'merriweather' }} className="label-text text-black text-lg"> {t("Password")} </span>
            </label>
            <input
              type="password"
              className="input input-ghost border-0 border-b-2 rounded-none border-gray-400 bg-transparent focus:outline-none focus:text-black"
              onChange={(text) => setPassword(text.target.value)}
            />
            <label className="label">
              <span style={{ fontFamily: 'merriweather' }} className="label-text-alt text-black">
                {t("ForgetPwd")}
              </span>
            </label>
          </div>
          {errorMessage && (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          )}
          <div className="form-control w-full max-w-xl mt-10">
            <button style={{ fontFamily: 'Arial' }}
              className="btn btn-active text-white"
              onClick={() => getClientToken(email, password)}
            >
              {t("SignIn")}
            </button>
          </div>
          <GoogleConnexion/>
        </div>

        <div className="flex-grow w-1/2 bg-white card rounded-box place-items-end">
          <img
            src={loginImage}
            alt="loginImage"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
