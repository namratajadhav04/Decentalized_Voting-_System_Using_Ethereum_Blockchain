import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation

interface BackProps {
  call?: () => void; 
}

const Back: React.FC<BackProps> = ({ call }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize t function

  const handleBackClick = () => {
    if (call) call();
    navigate("/home");
  };

  return (
    <div onClick={handleBackClick} className="back title-small">
      <span className="icon">
        <IoIosArrowBack />
      </span>
      {t('back')} {/* Use t function to translate BACK */}
    </div>
  );
};

export default Back;
