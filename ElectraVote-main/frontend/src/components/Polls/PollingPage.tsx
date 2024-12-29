import React from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Panel from "./Panel";
import Chart from "./Chart";
import "../../styles/components/Polls/PollingPage.scss";

interface PollingPageProps {
  pollData: {
    name: string; // Poll name
    description: string; // Poll description
    votes: Record<string, number>; // Votes data
    enableVote?: boolean; // Option to enable voting
    userId?: number; // User ID
    userName?: string; // User name
  };
}

const PollingPage: React.FC<PollingPageProps> = ({ pollData }) => {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <div className="polling-page">
      <Panel name={t(pollData.name)} description={t(pollData.description)}>
        <Chart
          votes={pollData.votes}
          enableVote={pollData.enableVote}
          userId={pollData.userId}
          userName={pollData.userName}
        />
      </Panel>
    </div>
  );
};

export default PollingPage;
