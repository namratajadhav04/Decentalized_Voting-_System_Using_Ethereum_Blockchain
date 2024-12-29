import React from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import BackButton from "../components/Back";

interface LayoutProps {
  error: string;
  success?: string;
  children: JSX.Element;
}

const Login = (props: LayoutProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="login-layout-wrapper">
      <div className="left">
        <BackButton call={() => navigate("/")} />

        <h1 className="main-heading">{t("Blockchain Based Voting System")}</h1>
        <p className="subb-heading">{t("Secure, Transparent, and Reliable Voting")}</p>

        <img 
          src="https://miro.medium.com/v2/resize:fit:1400/1*4wuwFNmXAKe261UwiYS2Pw.png" 
          alt={t("Secure Voting")} 
          className="login-image"
        />
      </div>

      <div className="right">
        {props.error && (
          <div className="error-message">
            <i className="bi bi-exclamation-circle"></i>
            <span>{props.error}</span>
          </div>
        )}

        {props.success && (
          <div className="success-message">
            <i className="bi bi-check-circle"></i>
            <span>{props.success}</span>
          </div>
        )}

        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Login;
