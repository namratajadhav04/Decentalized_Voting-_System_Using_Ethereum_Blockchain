import React from 'react';
import { useTranslation } from 'react-i18next';
import './CollegeVotingPage.scss'; // Assuming you have a separate SCSS file for styles

const CollegeVotingPage = () => {
  const { t } = useTranslation(); // Hook for translation

  return (
    <div className="college-voting-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting in Colleges')}</h1>

          <p>
            {t("Colleges and universities often face challenges in conducting student elections. ElectraVote provides a streamlined and transparent voting process that enhances student engagement and participation.")}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by Colleges')}</h2>
          <ul className="challenges-list">
            <li>{t('Low voter turnout due to lack of awareness.')}</li>
            <li>{t('Logistical issues with physical voting locations.')}</li>
            <li>{t('Potential for fraud and manipulation in elections.')}</li>
            <li>{t('Time constraints for conducting elections.')}</li>
            <li>{t('Difficulty in reaching all student demographics.')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t("ElectraVote’s platform is particularly useful for:")}
          </p>
          <ul className="use-cases-list">
            <li>{t('Student body elections, including council representatives.')}</li>
            <li>{t('Referendums on significant campus issues.')}</li>
            <li>{t('Voting for homecoming royalty and other campus events.')}</li>
            <li>{t('Engaging with students in decision-making processes.')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Engagement:')}</strong> {t('Boosts student participation and involvement in college governance.')}</li>
            <li><strong>{t('Integrity:')}</strong> {t('Ensures a secure and fair voting process.')}</li>
            <li><strong>{t('Convenience:')}</strong> {t('Enables students to vote from anywhere at any time.')}</li>
            <li><strong>{t('Efficiency:')}</strong> {t('Reduces the time required to tally votes and announce results.')}</li>
            <li><strong>{t('Inclusivity:')}</strong> {t('Allows for remote participation from all students, regardless of location.')}</li>
          </ul>

          <p>
            {t("With ElectraVote, colleges can facilitate a democratic process that empowers students and fosters a vibrant campus culture.")}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://th.bing.com/th/id/OIP.qy7Pdd5DuCN5TRwteEzsVgHaFG?w=280&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt={t('College Voting')} className="featured-image" />
        </div>
      </div>
    </div>
  );
};

export default CollegeVotingPage;
