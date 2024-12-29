import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import { auth } from "../../firebase";
import { User } from "firebase/auth";
import io from "socket.io-client";

const NavbarUp: React.FC = () => {
  const { t } = useTranslation();
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState<boolean>(false); // To control Pages dropdown visibility
  const navigate = useNavigate();

  // Socket connection for notifications
  useEffect(() => {
    const socket = io("http://localhost:3001");

    // Listen for new notifications
    socket.on("newNotification", (data: { message: string }) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      setScrollingDown(currentScroll > lastScrollTop);
      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const logOut = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    try {
      await auth.signOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const mockSuggestions = ["Blockchain", "Voting", "Election", "ElectraVote", "Admin Panel"];
    setSuggestions(mockSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
  };

  // Toggle notification dropdown visibility
  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  // Toggle Pages dropdown visibility
  const togglePagesDropdown = () => {
    setShowPagesDropdown((prevState) => !prevState);
  };

  return (
    <nav className={`navbar ${scrollingDown ? "hidden" : ""} ${darkMode ? "dark-mode" : ""}`}>
      <Link to="/home">
        <span className="logo">ElectraVote</span>
      </Link>
      <div className="nav-links">
        <div className="language-switcher">
          <select onChange={(e) => changeLanguage(e.target.value)} defaultValue="en">
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>

        <Link to="/home" className="nav-link">{t('home')}</Link>

        <Link to="/features" className="nav-link">
          {t('About Us')}
        </Link>

        {/* Toggleable Pages Dropdown */}
        <div className="nav-link dropdown">
          <span onClick={togglePagesDropdown} className="dropdown-toggle">
            {t('Pages')} <span className="dropdown-icon">▼</span>
          </span>
          {showPagesDropdown && (
            <div className="dropdown-menu">
              <Link to="/housing-societies" className="dropdown-item">{t('Housing Society Voting')}</Link>
              <Link to="/club-voting" className="dropdown-item">{t('Club Voting')}</Link>
              <Link to="/college-voting" className="dropdown-item">{t('College Voting')}</Link>
              <Link to="/ngo-voting" className="dropdown-item">{t('NGO Voting')}</Link>
              <Link to="/corporate-voting" className="dropdown-item">{t('Corporate Voting')}</Link>
              <Link to="/union-voting" className="dropdown-item">{t('Union Voting')}</Link>
              {/* Add more links as needed */}
            </div>
          )}
        </div>

        <Link to="/contact" className="nav-link">{t('Contact Us')}</Link>

        {user ? (
          <>
            <Link to="/profile" className="nav-link">{t('profile')}</Link>
            <a href="/logout" className="nav-link logout" onClick={logOut}>
              {t('logout')}
            </a>
            {user?.email === "admin@example.com" && (
              <Link to="/admin" className="nav-link">{t('admin_panel')}</Link>
            )}
          </>
        ) : (
          <Link to="/login" className="button-link">{t('sign_in')}</Link>
        )}

        <div className="notifications-icon" onClick={toggleNotifications}>
          <span>🔔</span>
          {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
        </div>

        {showNotifications && (
          <div className="notifications-dropdown">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="notification-item">
                  {notification}
                </div>
              ))
            ) : (
              <div>No notifications</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarUp;
