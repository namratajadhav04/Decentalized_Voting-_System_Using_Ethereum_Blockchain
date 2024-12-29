import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Finished = () => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="vote-status-wrapper">
      <span className="finished">
        <i className="bi bi-check2-circle"></i>
        <span className="text-normal">{t("Finished")}</span> {/* Use t for translation */}
      </span>
    
    </div>
  );
};

export default Finished;
