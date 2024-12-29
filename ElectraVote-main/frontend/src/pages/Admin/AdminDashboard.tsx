import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardHeader from '../../components/DashboardHeader';
import Overview from '../../components/DashboardSections/Overview';
import UserManagement from '../../components/DashboardSections/UserManagement';
import ElectionManagement from '../../components/DashboardSections/ElectionManagement';
import Statistics from '../../components/DashboardSections/Statistics';
import AuditLogs from '../../components/DashboardSections/AuditLogs';
import SystemSettings from '../../components/DashboardSections/SystemSettings';
import SystemHealthMonitoring from '../../components/DashboardSections/SystemHealthMonitoring'; // Import the new component
import { isAuthenticated, userIsAdmin } from '../../utils/auth';
import './Dashboard.scss'; 

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const authenticated = await isAuthenticated();
        const isAdmin = await userIsAdmin();

        if (!authenticated || !isAdmin) {
          navigate('/login');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate('/login');
      }
    };
    authCheck();
  }, [navigate]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'user-management':
        return <UserManagement />;
      case 'election-management':
        return <ElectionManagement />;
      case 'statistics':
        return <Statistics />;
      case 'audit-logs':
        return <AuditLogs />;
      case 'system-health': // Render the new component here
        return <SystemHealthMonitoring />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Overview />;
    }
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <DashboardSidebar setActiveSection={setActiveSection} />
      <div className="dashboard-content">
        <DashboardHeader />
        <div className="dashboard-section">{renderSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
