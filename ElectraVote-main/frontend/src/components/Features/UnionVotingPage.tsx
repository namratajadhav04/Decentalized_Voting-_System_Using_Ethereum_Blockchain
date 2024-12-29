import React from 'react';
import './UnionVotingPage.scss';
import { useTranslation } from 'react-i18next';

const UnionVotingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="union-voting-page">
      <div className="content">
        <div className="text-section">
          <h1 className="page-title">{t('Online Voting in Unions')}</h1>

          <p>
            {t("Unions play a vital role in representing the interests of workers. ElectraVote’s online voting platform is designed to enhance democratic processes within unions, ensuring every member has a voice.")}
          </p>

          <h2 className="challenges-title">{t('Challenges Faced by Unions')}</h2>
          <ul className="challenges-list">
            <li>{t('Low member engagement in union activities.')}</li>
            <li>{t('Logistical difficulties in organizing in-person votes.')}</li>
            <li>{t('Concerns about election security and transparency.')}</li>
            <li>{t('Time constraints for conducting elections and meetings.')}</li>
            <li>{t('Disparities in member access to voting methods.')}</li>
          </ul>

          <h2 className="use-cases-title">{t('Use Cases of ElectraVote')}</h2>
          <p>
            {t('ElectraVote is particularly useful for:')}
          </p>
          <ul className="use-cases-list">
            <li>{t('Electing union representatives and leaders.')}</li>
            <li>{t('Voting on contracts and labor agreements.')}</li>
            <li>{t('Decision-making on union initiatives and activities.')}</li>
            <li>{t('Gathering member feedback on important issues.')}</li>
          </ul>

          <h2 className="benefits-title">{t('Benefits of Using ElectraVote')}</h2>
          <ul className="benefits-list">
            <li><strong>{t('Inclusivity:')}</strong> {t('Ensures every member can participate, regardless of location.')}</li>
            <li><strong>{t('Accountability:')}</strong> {t('Maintains clear and auditable voting records.')}</li>
            <li><strong>{t('Efficiency:')}</strong> {t('Streamlines the voting process, saving time and resources.')}</li>
            <li><strong>{t('Engagement:')}</strong> {t('Encourages greater member involvement in union decisions.')}</li>
            <li><strong>{t('Accessibility:')}</strong> {t('Provides a user-friendly platform for all members.')}</li>
          </ul>

          <p>
            {t("With ElectraVote, unions can foster a more engaged membership and ensure fair representation in decision-making.")}
          </p>
        </div>
        
        <div className="image-section">
          <img src="https://media.istockphoto.com/vectors/icon-union-people-vector-id498837408?k=6&m=498837408&s=612x612&w=0&h=9qzfNvCyHceuz6FfcCKdMpPIDI9H3JG--eedsIF3KIo=" alt="Union Voting" className="featured-image" />
        </div>
      </div>
    </div>
  );
};

export default UnionVotingPage;
