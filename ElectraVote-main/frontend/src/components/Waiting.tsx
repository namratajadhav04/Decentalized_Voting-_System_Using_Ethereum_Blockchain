import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Waiting = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="waiting-wrapper">
      <div className="loading-container">
        <div className="cog spinning">
          <i className="bi bi-gear-fill"></i>
        </div>
        <div className="loading-text">{t("Loading, please wait...")}</div> {/* Use t for translation */}
      </div>

      <h2 className="title">{t("Waiting for the Election to Start")}</h2> {/* Use t for translation */}

      <p className="info-text">
        {t("Please make sure to check your eligibility and prepare your votes. We appreciate your patience as we ensure a smooth and secure election process.")}
      </p> {/* Use t for translation */}

      <div className="animation-container">
        <div className="animated-dot"></div>
        <div className="animated-dot"></div>
        <div className="animated-dot"></div>
      </div>

      <div className="progress-bar"></div>
    </div>
  );
};

export default Waiting;
