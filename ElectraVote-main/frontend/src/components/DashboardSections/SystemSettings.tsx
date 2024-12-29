import React, { useState, useEffect } from 'react';
import './SystemSettings.scss';

interface Settings {
  maxVoteAttempts: number;
  requireAuthentication: boolean;
  votingEndTime: string;
  minimumAge: number;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
  enablePushNotifications: boolean;
  notificationFrequency: number;
  defaultTheme: string;
}

const SystemSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    maxVoteAttempts: 3,
    requireAuthentication: true,
    votingEndTime: '18:00',
    minimumAge: 18,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enablePushNotifications: true,
    notificationFrequency: 30,
    defaultTheme: 'Dark',
  });

  const [saveStatus, setSaveStatus] = useState<string>('');
  const [activityLog, setActivityLog] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.defaultTheme.toLowerCase());
  }, [settings.defaultTheme]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings, [name]: type === 'checkbox' ? checked : value };
      logActivity(name as keyof Settings, newSettings[name as keyof Settings]);
      return newSettings;
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSettings((prevSettings) => {
      const newSettings = { ...prevSettings, [name]: value };
      logActivity(name as keyof Settings, value);
      return newSettings;
    });
  };

  const logActivity = (setting: keyof Settings, value: any) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog((prevLog) => [`[${timestamp}] ${setting} set to ${value}`, ...prevLog]);
    setSaveStatus('Settings saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const restoreDefaults = () => {
    const defaultSettings: Settings = {
      maxVoteAttempts: 3,
      requireAuthentication: true,
      votingEndTime: '18:00',
      minimumAge: 18,
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      enablePushNotifications: true,
      notificationFrequency: 30,
      defaultTheme: 'Dark',
    };
    setSettings(defaultSettings);
    setActivityLog(['Settings restored to default']);
  };

  return (
    <div className="system-settings">
      <h2>System Settings</h2>
      {saveStatus && <p className="save-status">{saveStatus}</p>}

      <div className="settings-section">
        <h3>Voting Settings</h3>
        <label>
          Max Vote Attempts
          <input
            type="number"
            name="maxVoteAttempts"
            value={settings.maxVoteAttempts}
            onChange={handleChange}
          />
        </label>
        <label>
          Require Authentication
          <div className="toggle-button">
            <input
              type="checkbox"
              name="requireAuthentication"
              checked={settings.requireAuthentication}
              onChange={handleChange}
            />
            <span className="slider" />
          </div>
        </label>
        <label>
          Voting End Time
          <input
            type="time"
            name="votingEndTime"
            value={settings.votingEndTime}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="settings-section">
        <h3>Eligibility Settings</h3>
        <label>
          Minimum Age to Vote
          <input
            type="number"
            name="minimumAge"
            value={settings.minimumAge}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="settings-section notification-settings">
        <h3>Notification Settings</h3>
        <label>
          Email Notifications
          <div className="toggle-button">
            <input
              type="checkbox"
              name="enableEmailNotifications"
              checked={settings.enableEmailNotifications}
              onChange={handleChange}
            />
            <span className="slider" />
          </div>
        </label>
        <label>
          SMS Notifications
          <div className="toggle-button">
            <input
              type="checkbox"
              name="enableSMSNotifications"
              checked={settings.enableSMSNotifications}
              onChange={handleChange}
            />
            <span className="slider" />
          </div>
        </label>
        <label>
          Push Notifications
          <div className="toggle-button">
            <input
              type="checkbox"
              name="enablePushNotifications"
              checked={settings.enablePushNotifications}
              onChange={handleChange}
            />
            <span className="slider" />
          </div>
        </label>
        <label>
          Notification Frequency
          <input
            type="range"
            name="notificationFrequency"
            value={settings.notificationFrequency}
            min={1}
            max={60}
            onChange={handleChange}
          />
          <span>{settings.notificationFrequency} minutes</span>
        </label>
      </div>

      <div className="settings-section">
        <h3>Appearance Settings</h3>
        <label>
          Default Theme
          <select name="defaultTheme" value={settings.defaultTheme} onChange={handleSelectChange}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System Default</option>
          </select>
        </label>
        <button onClick={restoreDefaults} className="restore-button">Restore Defaults</button>
      </div>

      <div className="activity-log">
        <h4>Recent Activity</h4>
        <ul>
          {activityLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SystemSettings;
