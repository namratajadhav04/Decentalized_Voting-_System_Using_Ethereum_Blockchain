import React, { useState } from 'react';
import './AuditLogs.scss';

interface LogEntry {
  id: number; // Added an ID for each log entry
  action: string;
  date: string;
  user: string;
}

const AuditLogs: React.FC = () => {
  const initialLogs: LogEntry[] = [
    { id: 1, action: 'Admin created a new election', date: '2023-11-04', user: 'Admin1' },
    { id: 2, action: 'User voted in election', date: '2023-11-03', user: 'User23' },
    { id: 3, action: 'Admin updated system settings', date: '2023-11-02', user: 'Admin2' },
    { id: 4, action: 'User registered', date: '2023-11-01', user: 'User45' },
    { id: 5, action: 'Admin deleted an election', date: '2023-10-30', user: 'Admin3' },
    { id: 6, action: 'User updated profile', date: '2023-10-29', user: 'User12' },
    { id: 7, action: 'User logged in', date: '2023-10-28', user: 'User34' },
    { id: 8, action: 'Admin approved a user', date: '2023-10-27', user: 'Admin1' },
  ];

  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'user'>('date');
  const [currentLog, setCurrentLog] = useState<LogEntry | null>(null);

  // Filter logs based on the search term
  const filteredLogs = logs.filter((log) =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort logs by date or user
  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.user.localeCompare(b.user);
  });

  // Delete log entry
  const handleDelete = (id: number) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  // Show details for a specific log
  const handleLogClick = (log: LogEntry) => {
    setCurrentLog(log);
  };

  // Close the details view
  const handleCloseDetails = () => {
    setCurrentLog(null);
  };

  return (
    <div className="audit-logs">
      <h2>Audit Logs</h2>
      
      {/* Search and Sort Controls */}
      <div className="audit-controls">
        <input
          type="text"
          placeholder="Search logs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'user')}
          className="sort-select"
        >
          <option value="date">Sort by Date</option>
          <option value="user">Sort by User</option>
        </select>
      </div>

      {/* Log List */}
      <ul className="log-list">
        {sortedLogs.map((log) => (
          <li key={log.id} className="log-entry" onClick={() => handleLogClick(log)}>
            <div className="log-details">
              <span className="log-action">{log.action}</span>
              <span className="log-date">{log.date}</span>
              <span className="log-user">by {log.user}</span>
            </div>
            <button className="delete-button" onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the log click event
              handleDelete(log.id);
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Log Detail Modal */}
      {currentLog && (
        <div className="log-detail-modal">
          <div className="modal-content">
            <h3>Log Details</h3>
            <p><strong>Action:</strong> {currentLog.action}</p>
            <p><strong>Date:</strong> {currentLog.date}</p>
            <p><strong>User:</strong> {currentLog.user}</p>
            <button className="close-button" onClick={handleCloseDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;
