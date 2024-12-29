import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../contexts/Auth";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.scss";

const DashboardHeader: React.FC = () => {
  const { name, logout } = useContext(AuthContext)!;
  const [dateTime, setDateTime] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleViewProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className="header">
      <div className="header-info">
        <h1>Welcome, {name}!</h1>
        <p className="date-time">{dateTime.toLocaleString()}</p>
      </div>
      <div className="header-actions">
        <div className="profile-menu" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={toggleDropdown}
          >
            Profile ▼
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleViewProfile}>View Profile</li>
              <li onClick={handleSettings}>Settings</li>
              <li onClick={handleLogout} className="logout-option">
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
