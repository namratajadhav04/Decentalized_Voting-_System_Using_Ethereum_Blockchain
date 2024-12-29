import React, { useEffect, useState } from 'react';
import './Overview.scss';
import { AiOutlineSetting } from 'react-icons/ai';
import io from 'socket.io-client';

const Overview: React.FC = () => {
  const [stats, setStats] = useState({
    totalElections: 0,
    registeredVoters: 0,
    activeVotes: 0,
    completedElections: 0,
    pendingApprovals: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Fetch initial stats from backend
    const fetchInitialStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats/overview');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data);
        setIsLoading(false);
      } catch (error) {
        setError(`Error fetching initial stats: ${(error as Error).message}`);
        setIsLoading(false);
      }
    };

    // Fetch stats data on initial load
    fetchInitialStats();

    // Set up WebSocket connection to backend with transport options
    const socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],  // Fallback to polling if WebSocket fails
      reconnectionAttempts: 5,               // Limit reconnection attempts
    });

    // Listen for real-time updates from the server
    socket.on("stats", (data: any) => {
      setStats(data); // Update stats on receiving new data
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="overview">
      <header className="overview-header">
        <h2>Dashboard Overview</h2>
        <AiOutlineSetting
          className={`settings-icon ${showSettings ? 'active' : ''}`}
          title="Advanced Settings"
          onClick={() => setShowSettings(!showSettings)}
        />
        {showSettings && <div className="settings-dropdown">Settings Content</div>}
      </header>

      <div className="stats-cards">
        <div className="card">
          <h3>Total Elections</h3>
          <p>{stats.totalElections}</p>
        </div>
        <div className="card">
          <h3>Registered Voters</h3>
          <p>{stats.registeredVoters}</p>
        </div>
        <div className="card">
          <h3>Active Votes</h3>
          <p>{stats.activeVotes}</p>
        </div>
        <div className="card">
          <h3>Completed Elections</h3>
          <p>{stats.completedElections}</p>
        </div>
        <div className="card">
          <h3>Pending Approvals</h3>
          <p>{stats.pendingApprovals}</p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
