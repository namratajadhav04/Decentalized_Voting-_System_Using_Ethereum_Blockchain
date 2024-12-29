import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation

interface PanelProps {
  name: string; // The name to display
  description: string; // The description to display
  children: JSX.Element; // Children elements to render inside the panel
}

const Panel: React.FC<PanelProps> = ({ name, description, children }) => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="polls-container modern-card">
      <div className="poll-header">
        <h2 className="poll-title">{t(name)}</h2> {/* Use t for translation */}
        <p className="poll-description">{t(description)}</p> {/* Use t for translation */}
      </div>
      <div className="votes-wrapper">{children}</div>
    </div>
  );
};

export default Panel;
