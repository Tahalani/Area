import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/registerPage.tsx";
import Login from "./Pages/loginPage.tsx";
import Home from "./Pages/homePage.tsx";
import Setting from "./Pages/settingPage.tsx";
import Profil from "./Pages/profilPage.tsx";
import Area from "./Pages/areaPage.tsx";
import InArea from "./Pages/inAreaPage.tsx";
import Service from "./Pages/servicePage.tsx";
import AuthSuccess from "./Pages/auth/succesPage.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "../translate.tsx";
import { clientTokenContext } from "../context";
import { useState } from "react";
import { ServiceProvider } from "./ServiceContext";

function App() {
  const [clientToken, setClientToken] = useState("");
  return (
    <>
    <ServiceProvider>
      <I18nextProvider i18n={i18n}>
        <clientTokenContext.Provider value={{ clientToken, setClientToken }}>
          <BrowserRouter>
            <RouterRoutes>
              <Route path="/homePage" element={<Home />} />
              <Route path="/registerPage" element={<Register />} />
              <Route path="/loginPage" element={<Login />} />
              <Route path="/profilPage" element={<Profil />} />
              <Route path="/areaPage" element={<Area />} />
              <Route path="/settingPage" element={<Setting />} />
              <Route path="/servicePage" element={<Service />} />
              <Route path="/inAreaPage" element={<InArea />} />
              <Route path="/auth/succes" element={<AuthSuccess />} />
              <Route path="/" element={<Home />} />
            </RouterRoutes>
          </BrowserRouter>
        </clientTokenContext.Provider>
      </I18nextProvider>
    </ServiceProvider>
    </>
  );
}

export default App;
