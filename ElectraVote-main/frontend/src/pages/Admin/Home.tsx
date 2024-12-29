import React, { useEffect, useState, useCallback } from "react";
import { RouteProps } from "react-router";
import axios from "../../axios";
import StartPage from "./Start";
import PollsPage from "./Polls";
import ResultPage from "./Result";
import { Button, Typography, Box, CircularProgress, Alert } from "@mui/material";


enum PollStatus {
  NotStarted = "not-started",
  Running = "running",
  Finished = "finished",
}

const Home = (props: RouteProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<PollStatus>(PollStatus.NotStarted);
  const [error, setError] = useState<string | null>(null);

  
  const fetchStatus = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get("/polls/status")
      .then((res) => {
        setStatus(res.data.status);
        setLoading(false);
      })
      .catch((err) => {
        const message = err.response?.data?.message || "Failed to fetch status. Please try again.";
        setError(message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleRefresh = () => {
    fetchStatus();
  };

  if (loading) {
    return (
      <Box className="loading-container" display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="container" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
        <Button variant="contained" className="retry-button" onClick={handleRefresh}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100vh" position="relative">
    
      <Box className="container" display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
        {status === PollStatus.Finished && <ResultPage />}
        {status === PollStatus.Running && <PollsPage />}
        {status === PollStatus.NotStarted && <StartPage />}
      </Box>

      
    </Box>
  );
};

export default Home;
