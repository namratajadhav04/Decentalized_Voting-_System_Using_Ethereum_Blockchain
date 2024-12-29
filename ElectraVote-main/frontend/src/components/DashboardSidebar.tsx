import React from 'react';
import './DashboardSidebar.scss';

const DashboardSidebar: React.FC<{ setActiveSection: (section: string) => void }> = ({ setActiveSection }) => {
  return (
    <aside className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li onClick={() => setActiveSection('overview')}>Overview</li>
        <li onClick={() => setActiveSection('user-management')}>User Management</li>
        <li onClick={() => setActiveSection('election-management')}>Election Management</li>
        <li onClick={() => setActiveSection('statistics')}>Statistics</li>
        <li onClick={() => setActiveSection('audit-logs')}>Audit Logs</li>
        <li onClick={() => setActiveSection('system-health')}>System Health Monitoring</li> {/* Correct section name */}        <li onClick={() => setActiveSection('settings')}>Settings</li>
      </ul>
    </aside>
  );
};

export default DashboardSidebar;
