import React from "react";
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import '../styles/components/Footer.scss';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(); 
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          {t("ElectraVote")}
          <p>{t('Empowering democracy with a secure and transparent decentralized voting system.')}</p>
        </div>
        <div className="footer-links">
          <h3 className="footer-section-title">{t("Quick Links")}</h3>
          <ul>
            <li><a href="/home">{t("Home")}</a></li>
            <li><a href="/features">{t("About Us")}</a></li>
            <li><a href="/contact">{t("Contact Us")}</a></li>
          </ul>
        </div>
        <div className="footer-services">
          <h3 className="footer-section-title">{t("Our Services")}</h3>
          <ul>
            <li><a href="/housing-societies">{t("Housing Society Voting")}</a></li>
            <li><a href="/club-voting">{t("Club Voting")}</a></li>
            <li><a href="/college-voting">{t("College Voting")}</a></li>
            <li><a href="/ngo-voting">{t("NGO Voting")}</a></li>
            <li><a href="/corporate-voting">{t("Corporate Voting")}</a></li>
            <li><a href="/union-voting">{t("Union Voting")}</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3 className="footer-section-title">{t("Contact Us")}</h3>
          <ul>
            <li><a href="mailto:info@electravote.com"><FaEnvelope /> {t("info@electravote.com")}</a></li>
            <li><a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaTwitter /> {t("Twitter")}</a></li>
            <li><a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer"><FaLinkedin /> {t("LinkedIn")}</a></li>
            <li><a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer"><FaGithub /> {t("GitHub")}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 {t("ElectraVote")}. {t("All rights reserved.")}</p>
      </div>
    </footer>
  );
};

export default Footer;
