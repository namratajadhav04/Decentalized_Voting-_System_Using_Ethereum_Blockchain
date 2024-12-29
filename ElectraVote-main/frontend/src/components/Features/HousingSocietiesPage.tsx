import React from 'react';
import './HousingSocietiesPage.scss'; // Assuming you have a separate SCSS file for styles
import { useTranslation } from "react-i18next"; // Import useTranslation

const HousingSocietiesPage = () => {
  const { t } = useTranslation(); // Initialize translation

  return (
    <div className="housing-societies-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting In Cooperative Housing Societies')}</h1>

          <p>
            {t('There are over 10 lakh cooperative housing societies in India, commonly referred to as Cooperative Housing Societies (CHS), Associations of Residents (AOR), Associations of Homeowners (AOH), Apartment Owners Associations (AOA), Housing Societies, or Resident\'s Welfare Associations (RWA). While there may be slight differences in their incorporation structures, the management of these societies is largely similar. These societies are governed by members who are democratically elected at regular intervals, typically required to hold elections every 1-3 years based on the relevant state laws and the governing Cooperative Society Act.')}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by Societies')}</h2>
          <ul className="challenges-list">
            <li>{t('Lack of full-time members in the management committee')}</li>
            <li>{t('Limited funds and varying financial capacity of members')}</li>
            <li>{t('Internal disputes and differing opinions')}</li>
            <li>{t('Vested interests affecting management control')}</li>
            <li>{t('Litigation with builders or society members')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t('ElectraVote\'s online voting solution is designed to simplify election management and is particularly beneficial for:')}
          </p>
          <ul className="use-cases-list">
            <li>{t('Voting on resolutions during Annual General Meetings (AGM)')}</li>
            <li>{t('Voting on resolutions in Extra-ordinary General Meetings (EGM) and monthly meetings')}</li>
            <li>{t('Facilitating voting in cases of disagreements and disputes')}</li>
            <li>{t('Election of Committee Members, ensuring fair representation')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Increased Participation:')}</strong> {t('Encourages more members to participate in the voting process.')}</li>
            <li><strong>{t('Transparency:')}</strong> {t('Ensures that all voting processes are transparent and auditable.')}</li>
            <li><strong>{t('Cost-Effective:')}</strong> {t('Reduces the costs associated with traditional voting methods.')}</li>
            <li><strong>{t('Time-Saving:')}</strong> {t('Streamlines the election process, allowing for quicker decision-making.')}</li>
            <li><strong>{t('Accessibility:')}</strong> {t('Makes voting accessible for all members, regardless of their location.')}</li>
          </ul>

          <p>
            {t('With ElectraVote, cooperative housing societies can ensure that their elections are conducted securely, transparently, and in a manner that promotes trust and engagement among members.')}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://th.bing.com/th/id/OIP.xhkjnGF1J8K1i02kVgD73wHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3" alt={t('Cooperative Housing Society')} className="featured-image" /> {/* Replace with your image path */}
        </div>
      </div>
    </div>
  );
};

export default HousingSocietiesPage;
