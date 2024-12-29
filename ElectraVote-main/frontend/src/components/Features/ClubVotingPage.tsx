import React from 'react';
import './ClubVotingPage.scss'; // Assuming you have a separate SCSS file for styles
import { useTranslation } from "react-i18next"; // Import useTranslation

const ClubVotingPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="club-voting-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting in Clubs')}</h1>

          <p>
            {t('Clubs often have unique governance structures and ElectraVote is designed to cater to their specific needs, ensuring a smooth and effective voting process for all members.')}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by Clubs')}</h2>
          <ul className="challenges-list">
            <li>{t('Diverse membership with varying levels of engagement.')}</li>
            <li>{t('Difficulty in reaching all members for voting.')}</li>
            <li>{t('Time-consuming manual counting of votes.')}</li>
            <li>{t('Concerns over election security and integrity.')}</li>
            <li>{t('Logistical challenges in organizing meetings and voting.')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t('ElectraVote can be utilized for:')}
          </p>
          <ul className="use-cases-list">
            <li>{t('Electing club officers and committee members.')}</li>
            <li>{t('Voting on club activities and budget allocations.')}</li>
            <li>{t('Making decisions on event planning and logistics.')}</li>
            <li>{t('Gathering feedback on club initiatives and proposals.')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Simplicity:')}</strong> {t('Simplifies the voting process for club members.')}</li>
            <li><strong>{t('Transparency:')}</strong> {t('Maintains clear records of votes and outcomes.')}</li>
            <li><strong>{t('Accessibility:')}</strong> {t('Ensures all members can easily participate in votes.')}</li>
            <li><strong>{t('Time Efficiency:')}</strong> {t('Reduces the time needed for elections and announcements.')}</li>
            <li><strong>{t('Flexibility:')}</strong> {t('Allows for virtual voting options for members unable to attend in person.')}</li>
          </ul>

          <p>
            {t('With ElectraVote, clubs can enhance member involvement and ensure that decisions are made fairly and transparently.')}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://d101tm.org/wp-content/uploads/2018/11/Nov_Election_1000x500_ver3.jpg" alt={t('Club Voting')} className="featuredd-image" />
        </div>
      </div>
    </div>
  );
};

export default ClubVotingPage;
