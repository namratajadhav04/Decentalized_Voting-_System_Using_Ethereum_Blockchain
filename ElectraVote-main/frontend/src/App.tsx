import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavbarUp from "./components/Home/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./contexts/Auth";
import CustomRoutes from "./components/CustomRoutes";
import "./i18n/i18n"; // Importing styles or configurations
import { I18nextProvider } from "react-i18next"; 
import i18n from "./i18n/i18n"; 
import Chatbot from "./components/chatbot/chatbot";

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AuthProvider>
          <div className="app-container">
            <NavbarUp />
            <CustomRoutes />
            <Chatbot />
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
