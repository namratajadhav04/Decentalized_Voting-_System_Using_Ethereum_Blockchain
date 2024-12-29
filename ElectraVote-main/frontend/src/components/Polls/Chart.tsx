import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next"; // Import useTranslation

interface ChartProps {
  votes: Record<string, number>;
  enableVote?: boolean;
  userId?: number;
  userName?: string;
}

interface Candidate {
  name: string;
  gender: "male" | "female";
}

const Chart: React.FC<ChartProps> = ({ votes, enableVote, userId, userName }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastVoted, setLastVoted] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const candidates: Candidate[] = Object.keys(votes).map((name, index) => ({
    name,
    gender: index % 2 === 0 ? "male" : "female", // Assign gender dynamically for now
  }));

  const maleImages = [
    "https://cdn-icons-png.flaticon.com/128/2202/2202112.png",
    "https://cdn-icons-png.flaticon.com/128/921/921071.png",
    "https://cdn-icons-png.flaticon.com/128/4202/4202831.png",
    "https://cdn-icons-png.flaticon.com/128/4202/4202831.png",
  ];
  const femaleImages = [
    "https://cdn-icons-png.flaticon.com/128/11107/11107521.png",
    "https://cdn-icons-png.flaticon.com/128/921/921124.png",
    "https://cdn-icons-png.flaticon.com/128/4202/4202850.png",
    "https://cdn-icons-png.flaticon.com/128/11107/11107554.png",
  ];

  const vote = async (candidate: string) => {
    setLoading(true);
    try {
      await axios.post("/polls/vote", {
        id: userId?.toString(),
        name: userName,
        candidate,
      });
      setHasVoted(true);
      setLastVoted(candidate);
      toast.success(t("Vote cast successfully!")); // Use translation for success message
    } catch (err) {
      console.error(err);
      toast.error(t("Error occurred while voting, please try again.")); // Use translation for error message
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async () => {
    if (!feedback) return;

    setFeedbackMessage(t("Thank you for your feedback! Your input helps us improve and provide the best experience possible."));
    setFeedback("");

    setTimeout(() => {
      setFeedbackMessage(null);
    }, 10000);
  };

  const getButtons = () => {
    return candidates.map((candidate) => (
      <button
        onClick={() => vote(candidate.name)}
        key={candidate.name}
        className="button-wrapper text-normal"
        disabled={hasVoted || loading}
      >
        {loading ? <span className="spinner" /> : t("Vote for {{candidate}}", { candidate: candidate.name })} {/* Translation for button text */}
      </button>
    ));
  };

  const getNames = () => {
    return candidates.map((candidate) => (
      <div key={candidate.name} className="name-wrapper text-normal">
        {candidate.name}
      </div>
    ));
  };

  const getCircularCharts = () => {
    return candidates.map((candidate, index) => {
      const imageUrl =
        candidate.gender === "male"
          ? maleImages[index % maleImages.length]
          : femaleImages[index % femaleImages.length];

      const percentage = votes[candidate.name];

      return (
        <div className="circle-chart-container" key={candidate.name}>
          <div className="circle-chart" style={{}}>
            <img src={imageUrl} alt={candidate.name} className="candidate-image" />
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const socket = new WebSocket("ws://your-websocket-url");

    socket.onmessage = (event) => {
      const updatedVotes = JSON.parse(event.data);
      // Handle updated votes if necessary
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="chart-container">
      <h3 className="chart-title">{t("Vote Distribution")}</h3> {/* Translation for title */}
      <div className="circular-container">{getCircularCharts()}</div>
      <div className="names-wrapper">{getNames()}</div>

      {enableVote && !hasVoted && <div className="buttons-wrapper">{getButtons()}</div>}

      {hasVoted && !loading && (
        <div>
          <p className="vote-message">{t("You have successfully voted for {{candidate}}!", { candidate: lastVoted })}</p> {/* Translation for vote message */}

          <div className="feedback-container">
            <h4>{t("Your Feedback")}</h4> {/* Translation for feedback section title */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t("Write your feedback here...")} // Translation for feedback placeholder
            />
            <button onClick={submitFeedback} className="button-wrapper">
              {t("Submit Feedback")} {/* Translation for submit button */}
            </button>
            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
