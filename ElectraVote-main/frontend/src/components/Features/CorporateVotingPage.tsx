import React from 'react';
import './CorporateVotingPage.scss'; // Assuming you have a separate SCSS file for styles
import { useTranslation } from 'react-i18next';

const CorporateVotingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="corporate-voting-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting in Corporations')}</h1>

          <p>
            {t("Corporate governance is essential for the sustainable growth and accountability of organizations. ElectraVote’s online voting platform ensures that every shareholder can participate in corporate elections transparently and securely.")}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by Corporations')}</h2>
          <ul className="challenges-list">
            <li>{t('Low shareholder engagement in voting processes.')}</li>
            <li>{t('Logistical issues in organizing in-person shareholder meetings.')}</li>
            <li>{t('Concerns about election security and transparency.')}</li>
            <li>{t('Complexity in counting votes and announcing results.')}</li>
            <li>{t('Diverse shareholder demographics requiring different voting methods.')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t("ElectraVote is especially useful for:")}
          </p>
          <ul className="use-cases-list">
            <li>{t('Voting on board of directors\' elections.')}</li>
            <li>{t('Deciding on mergers and acquisitions.')}</li>
            <li>{t('Approving company policies and initiatives.')}</li>
            <li>{t('Gathering shareholder feedback on strategic decisions.')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Transparency:')}</strong> {t('Provides clear voting records and results.')}</li>
            <li><strong>{t('Efficiency:')}</strong> {t('Streamlines the voting process, saving time and resources.')}</li>
            <li><strong>{t('Inclusivity:')}</strong> {t('Ensures all shareholders can participate regardless of location.')}</li>
            <li><strong>{t('Accountability:')}</strong> {t('Guarantees fair and secure elections.')}</li>
            <li><strong>{t('Engagement:')}</strong> {t('Promotes active participation among shareholders.')}</li>
          </ul>

          <p>
            {t("With ElectraVote, corporations can enhance their governance structure and ensure all voices are heard in decision-making.")}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://th.bing.com/th/id/OIP.Q-hdMf3sO4vtdnQJAHyXcwAAAA?pid=ImgDet&w=184&h=184&c=7&dpr=1.3" alt="Corporate Voting" className="featured-image" />
        </div>
      </div>
    </div>
  );
};

export default CorporateVotingPage;
