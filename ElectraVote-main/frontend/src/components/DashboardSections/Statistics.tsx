import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Importing Axios for API calls
import './Statistics.scss';

const Statistics: React.FC = () => {
  // State to hold statistics data from the backend
  const [stats, setStats] = useState({
    registeredVoters: 3,
    votesCast: 1,
    ongoingElections: 0,
    completedElections: 1,
  });

  // State for animated counts
  const [animatedCounts, setAnimatedCounts] = useState([0, 0, 0, 0]);

  // Fetch statistics from the backend every few seconds
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Make sure this URL matches the one where your backend API is served
        const response = await axios.get('http://localhost:5000/api/statistics'); // Add full URL if needed
        console.log(response.data); // Log response to check if it's working
        setStats(response.data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    // Fetch data immediately on mount
    fetchStats();

    // Set an interval to fetch data every 5 seconds (or adjust based on your needs)
    const intervalId = setInterval(fetchStats, 5000);

    // Cleanup function to clear interval when component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Animate statistics counts
  useEffect(() => {
    const statsData = [
      stats.registeredVoters,
      stats.votesCast,
      stats.ongoingElections,
      stats.completedElections,
    ];

    statsData.forEach((stat, index) => {
      const increment = stat / 100; // Incremental speed adjustment
      let currentCount = animatedCounts[index];

      const counter = setInterval(() => {
        currentCount += increment;
        if (currentCount >= stat) {
          currentCount = stat;
          clearInterval(counter);  // Stop incrementing once target value is reached
        }
        setAnimatedCounts((prev) => {
          const updatedCounts = [...prev];
          updatedCounts[index] = Math.floor(currentCount);
          return updatedCounts;
        });
      }, 20); // Controls speed of the count animation
    });
  }, [stats]);  // Trigger animation whenever stats change

  return (
    <div className="statistics">
      <h2>Statistics Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Registered Voters</h3>
          <p>{animatedCounts[0]}</p>
        </div>
        <div className="stat-card">
          <h3>Votes Cast</h3>
          <p>{animatedCounts[1]}</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing Elections</h3>
          <p>{animatedCounts[2]}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Elections</h3>
          <p>{animatedCounts[3]}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
