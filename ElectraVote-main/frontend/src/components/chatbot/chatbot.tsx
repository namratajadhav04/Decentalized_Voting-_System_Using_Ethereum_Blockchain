import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import './chatbot.scss'; 
import { IoChatbubblesOutline } from 'react-icons/io5'; 
import { useTranslation } from "react-i18next";

const theme = {
  background: '#ffffff',  
  headerTitle: "#fffff",
  headerBgColor: '#007bff',  
  headerFontColor: '#fff',  
  headerFontSize: '20px',  
  botBubbleColor: 'linear-gradient(135deg, #007bff 0%, #00d2ff 100%)',  
  botFontColor: '#fff', 
  userBubbleColor: 'linear-gradient(135deg, #28a745 0%, #a8e063 100%)', 
  userFontColor: '#fff',  
  fontFamily: 'Roboto, sans-serif',  
  bubbleRadius: '25px', 
  headerRadius: '12px',  
};

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { t } = useTranslation();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="chatbot-wrapper">
        <button className="chat-button" onClick={toggleChat}>
          <IoChatbubblesOutline size={30} color="#fff" />
        </button>

        {isChatOpen && (
          <div className="chatbot-container">
            <ChatBot
              headerTitle={t("ElectraVote Assistant")}
              steps={[
                {
                  id: '1',
                  message: t('Hello! Welcome to ElectraVote. How can I assist you today?'),
                  trigger: '2',
                },
                {
                  id: '2',
                  options: [
                    { value: 'whatIsBlockchain', label: t('What is blockchain-based voting?'), trigger: 'whatIsBlockchain' },
                    { value: 'howDoesVotingWork', label: t('How does the voting process work?'), trigger: 'howDoesVotingWork' },
                    { value: 'voteAnonymous', label: t('Is my vote anonymous?'), trigger: 'voteAnonymous' },
                    { value: 'security', label: t('How is security ensured in blockchain voting?'), trigger: 'security' },
                    { value: 'benefits', label: t('What are the benefits of blockchain voting?'), trigger: 'benefits' },
                    { value: 'verifyVote', label: t('Can I verify that my vote was counted?'), trigger: 'verifyVote' },
                    { value: 'participation', label: t('Who can participate in the voting system?'), trigger: 'participation' },
                    { value: 'lostToken', label: t('What happens if I lose my voting token?'), trigger: 'lostToken' },
                    { value: 'resultsAccuracy', label: t('How do I know the voting results are accurate?'), trigger: 'resultsAccuracy' },
                  ],
                },
                {
                  id: 'whatIsBlockchain',
                  message: t('Blockchain-based voting is a secure and transparent system that uses blockchain technology to ensure votes are recorded and counted in a tamper-proof manner.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'howDoesVotingWork',
                  message: t('Voters are given a unique token to cast their votes. The votes are encrypted and stored on the blockchain, ensuring transparency and immutability.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'voteAnonymous',
                  message: t('Yes, the blockchain voting system ensures that your vote is anonymous and cannot be traced back to you while maintaining the integrity of the vote.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'security',
                  message: t('Security is ensured through encryption and the decentralized nature of blockchain. Once a vote is recorded, it cannot be altered or tampered with.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'benefits',
                  message: t('The main benefits include increased transparency, security, and efficiency, along with reduced fraud and tampering risks.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'verifyVote',
                  message: t('Yes, blockchain-based voting allows voters to verify that their vote was recorded on the blockchain without revealing their identity.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'participation',
                  message: t('All eligible voters who have been authenticated can participate in the voting process.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'lostToken',
                  message: t('If you lose your token, please contact the voting administrators immediately to reset your token and ensure you can still vote securely.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'resultsAccuracy',
                  message: t('The results are stored on the blockchain, making them transparent and immutable. Independent observers can verify the entire voting process.'),
                  trigger: 'moreHelp',
                },
                {
                  id: 'moreHelp',
                  message: t('Is there anything else you would like to know about? You can also ask about voting eligibility, token management, or anything else!'),
                  trigger: 'additionalHelpOptions',
                },
                {
                  id: 'additionalHelpOptions',
                  options: [
                    { value: 'yes', label: t('Yes'), trigger: '2' },
                    { value: 'no', label: t('No'), trigger: 'end' },
                    { value: 'feedback', label: t('Provide Feedback'), trigger: 'feedback' },
                  ],
                },
                {
                  id: 'feedback',
                  message: t('We appreciate your feedback! Please let us know how we can improve.'),
                  trigger: 'end',
                },
                {
                  id: 'end',
                  message: t('Thank you for using our chatbot. Have a great day!'),
                  end: true,
                },
              ]}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chatbot;
