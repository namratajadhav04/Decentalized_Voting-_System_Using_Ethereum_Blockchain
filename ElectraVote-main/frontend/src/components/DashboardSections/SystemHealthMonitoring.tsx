import React, { useEffect, useState } from 'react';
import './SystemHealthMonitoring.scss'; // Make sure the file extension is correct

interface HealthMetrics {
  uptime: number; // in hours
  apiResponseTime: number; // in milliseconds
  errorRate: number; // in percentage
}

const SystemHealthMonitoring: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/system-health'); // Use the correct backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }
        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics(); // Fetch metrics immediately on mount
    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  if (loading) return <div className="loading">Loading...</div>; // Added a class for loading state
  if (error) return <div className="error">Error: {error}</div>; // Added a class for error state

  return (
    <section className="system-health">
      <h2>System Health Monitoring</h2>
      <div className="health-metrics">
        {metrics && (
          <>
            <div className="metric">
              <h3>Server Uptime</h3>
              <p>{metrics.uptime.toFixed(2)} hours</p> {/* Displaying up to 2 decimal points */}
            </div>
            <div className="metric">
              <h3>API Response Time</h3>
              <p>{metrics.apiResponseTime} ms</p>
            </div>
            <div className="metric">
              <h3>Error Rate</h3>
              <p>{metrics.errorRate.toFixed(2)}%</p> {/* Displaying up to 2 decimal points */}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SystemHealthMonitoring;
