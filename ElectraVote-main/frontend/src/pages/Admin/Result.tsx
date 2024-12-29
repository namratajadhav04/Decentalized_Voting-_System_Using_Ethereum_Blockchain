import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Panel from "../../components/Polls/Panel";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Result = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", votes: {} });

  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const resetElection = () => {
    axios
      .post("/polls/reset")
      .then((_) => window.location.reload())
      .catch((err) => console.log({ err }));
  };

  if (loading) return <div>{t("Loading...")}</div>; // Add translation for loading

  return (
    <Panel name={data.name} description={data.description}>
      <>
        <Chart votes={data.votes} />

        <button
          onClick={resetElection}
          className="end-election-button button-primary"
        >
          {t("Reset Election")} {/* Add translation for button text */}
        </button>
      </>
    </Panel>
  );
};

export default Result;
