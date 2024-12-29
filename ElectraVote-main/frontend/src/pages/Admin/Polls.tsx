import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Panel from "../../components/Polls/Panel";
import { useTranslation } from "react-i18next"; // Import i18next translation hook

const Polls = () => {
  const { t } = useTranslation(); // Initialize translation
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });
  const [message, setMessage] = useState<string | null>(null);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const calculateWinner = (votes: Record<string, number>): string => {
    return Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
  };

  const endElection = async () => {
    try {
      const response = await axios.post("/polls/end");
      const winnerName = calculateWinner(data.votes); 
      setWinner(winnerName);
      setMessage(t("Congratulations to {{winnerName}} for winning the election! Your leadership and vision will guide us forward. Thank you to all participants for making this election a success!", { winnerName }));
      setTimeout(() => {
        setMessage(null);
        setWinner(null); 
      }, 5000); 
    } catch (err) {
      console.error(err);
      setMessage(t("An error occurred while ending the election."));
    }
  };

  if (loading) return <div>{t("Loading...")}</div>;

  return (
    <Panel name={data.name} description={data.description}>
      <>
        <Chart votes={data.votes} />

        <button
          onClick={endElection}
          className="end-election-button button-primary"
        >
          {t("End Election")}
        </button>

        {message && (
          <div className="message-box">
            <div className="message-content">
              <span className="emoji">🎉</span>
              <span>{message}</span>
            </div>
          </div>
        )}
      </>
    </Panel>
  );
};

export default Polls;
