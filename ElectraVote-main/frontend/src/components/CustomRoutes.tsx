import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Add 'Navigate' for redirection
import Home from "../pages/Home";
import Contact from "./Contact/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import View from "../pages/View";
import { AuthContext } from "../contexts/Auth";
import UserPollsPage from "../pages/User/Polls";
import HomePage from "../pages/Admin/Home";
import ProfilePage from "../pages/User/Profile";
import Default from "../layouts/Default";
import AdminUsersPage from "../pages/Admin/Users";
import AdminVerifyPage from "../pages/Admin/Verify";
import LogoutPage from "../pages/Logout";
import Chatbot from "./chatbot/chatbot";
import Features from "./Home/Features";
import HousingSocietiesPage from "./Features/HousingSocietiesPage";
import ClubVotingPage from "./Features/ClubVotingPage";
import NGOVotingPage from "./Features/NGOVotingPage";
import UnionVotingPage from "./Features/UnionVotingPage";
import CollegeVotingPage from "./Features/CollegeVotingPage";
import CorporateVotingPage from "./Features/CorporateVotingPage";
import AdminDashboard from '../pages/Admin/AdminDashboard';

const CustomRoutes = () => {
  const authContext = useContext(AuthContext);

  const getRoutes = (): JSX.Element => {
    if (!authContext) {
      return <div>Loading...</div>; // Ensure authContext is not undefined
    }

    if (authContext.loading) return <div>Loading...</div>;

    if (authContext.authenticated) {
      const adminMenu = [
        { name: 'Dashboard', link: '/admin/dashboard' },
        { name: "Polls", link: "/home" },
        { name: "Contact", link: "/contact" },
        { name: "Verify Users", link: "/users" },
        { name: "Profile", link: "/profile" },
        { name: "Sign out", link: "/signout" },
      ];

      const userMenu = [
        { name: "Polls", link: "/home" },
        { name: "Profile", link: "/profile" },
        { name: "Contact", link: "/contact" },
        { name: "Sign out", link: "/signout" },
      ];

      if (authContext.isAdmin) {
        // Authenticated admin routes
        return (
          <Default menu={adminMenu}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/verify/:name/:id" element={<AdminVerifyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/features" element={<Features />} />
              <Route path="/housing-societies" element={<HousingSocietiesPage />} />
              <Route path="/club-voting" element={<ClubVotingPage />} />
              <Route path="/ngo-voting" element={<NGOVotingPage />} />
              <Route path="/union-voting" element={<UnionVotingPage />} />
              <Route path="/college-voting" element={<CollegeVotingPage />} />
              <Route path="/corporate-voting" element={<CorporateVotingPage />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/signout" element={<LogoutPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </Default>
        );
      } else {
        // Authenticated user routes
        return (
          <Default menu={userMenu}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<UserPollsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/features" element={<Features />} />
              <Route path="/housing-societies" element={<HousingSocietiesPage />} />
              <Route path="/club-voting" element={<ClubVotingPage />} />
              <Route path="/ngo-voting" element={<NGOVotingPage />} />
              <Route path="/union-voting" element={<UnionVotingPage />} />
              <Route path="/college-voting" element={<CollegeVotingPage />} />
              <Route path="/corporate-voting" element={<CorporateVotingPage />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/signout" element={<LogoutPage />} />
            </Routes>
          </Default>
        );
      }
    } else {
      // Non-authenticated user routes
      return (
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<LogoutPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/housing-societies" element={<HousingSocietiesPage />} />
          <Route path="/view" element={<View />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/club-voting" element={<ClubVotingPage />} />
          <Route path="/ngo-voting" element={<NGOVotingPage />} />
          <Route path="/union-voting" element={<UnionVotingPage />} />
          <Route path="/college-voting" element={<CollegeVotingPage />} />
          <Route path="/corporate-voting" element={<CorporateVotingPage />} />
        </Routes>
      );
    }
  };

  return getRoutes();
};

export default CustomRoutes;
