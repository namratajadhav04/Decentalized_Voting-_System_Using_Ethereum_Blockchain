import React from 'react';
import { useTranslation } from 'react-i18next';
import './NGOVotingPage.scss'; // Assuming you have a separate SCSS file for styles

const NGOVotingPage = () => {
  const { t } = useTranslation(); // Hook for translation

  return (
    <div className="ngo-voting-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting in NGOs')}</h1>

          <p>
            {t("Non-Governmental Organizations (NGOs) rely on community engagement and participation for their initiatives. ElectraVote provides a reliable platform for NGOs to conduct transparent and secure elections.")}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by NGOs')}</h2>
          <ul className="challenges-list">
            <li>{t('Difficulty in reaching all members for voting.')}</li>
            <li>{t('Managing logistics for in-person meetings and votes.')}</li>
            <li>{t('Ensuring transparency and integrity in the election process.')}</li>
            <li>{t('Time-consuming vote tallying and result announcements.')}</li>
            <li>{t('Engaging a diverse member base with varying levels of involvement.')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t("ElectraVote’s platform is beneficial for:")}
          </p>
          <ul className="use-cases-list">
            <li>{t('Electing board members and leadership positions.')}</li>
            <li>{t('Voting on funding proposals and organizational initiatives.')}</li>
            <li>{t('Gathering member opinions on key issues and projects.')}</li>
            <li>{t('Facilitating stakeholder engagement and feedback.')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Transparency:')}</strong> {t('Enhances trust with clear voting records.')}</li>
            <li><strong>{t('Efficiency:')}</strong> {t('Speeds up the voting process and reduces administrative burden.')}</li>
            <li><strong>{t('Inclusion:')}</strong> {t('Encourages participation from all members, regardless of location.')}</li>
            <li><strong>{t('Accountability:')}</strong> {t('Ensures that elections are conducted fairly.')}</li>
            <li><strong>{t('Engagement:')}</strong> {t('Fosters a culture of active participation among members.')}</li>
          </ul>

          <p>
            {t("With ElectraVote, NGOs can ensure that their governance is democratic, participatory, and transparent.")}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://th.bing.com/th/id/OIP.MPkeRfBD9dh70ybmn9O80AHaE9?w=266&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt={t('NGO Voting')} className="featured-image" />
        </div>
      </div>
    </div>
  );
};

export default NGOVotingPage;
