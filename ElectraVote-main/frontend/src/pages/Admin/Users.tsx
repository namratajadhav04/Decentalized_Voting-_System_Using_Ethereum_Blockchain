import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "../../styles/pages/Admin/Users.scss";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type User = {
  id: number;
  name: string;
  citizenshipNumber: string;
  email: string;
  role: "Admin" | "Voter" | "Manager";
  profilePic: string;
  verified: boolean;
};

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/users/all");
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const verifyUser = async (id: number) => {
    try {
      const res = await axios.post("/users/verify", { userId: id });
      removeUserFromList(id);
      alert(t("User verified and email sent to") + ` ${res.data.user.email}`);
    } catch (error) {
      console.error("Verification failed:", error);
      alert(t("Failed to verify user or send email."));
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`/users/delete/${id}`);
      removeUserFromList(id);
    } catch (error) {
      console.error("Deletion failed:", error);
      alert(t("Failed to delete user."));
    }
  };

  const removeUserFromList = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const bulkAction = async (action: "verify" | "delete") => {
    if (selectedUsers.length === 0) {
      alert(t("No users selected."));
      return;
    }

    const confirmation = window.confirm(t(`Are you sure you want to ${action} the selected users?`));
    if (!confirmation) return;

    for (const userId of selectedUsers) {
      action === "verify" ? await verifyUser(userId) : await deleteUser(userId);
    }
    setSelectedUsers([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.citizenshipNumber.includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const toggleSelectUser = (id: number): void => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const UserItem = ({ user }: { user: User }) => (
    <div key={user.id} className={`user-item ${selectedUsers.includes(user.id) ? "selected" : ""}`}>
      <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelectUser(user.id)} />
      <div className="user-info" onClick={() => setShowModal(user)}>
        <img
          src={user.profilePic || "https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"}
          className="profile-pic"
          alt={t("Profile")}
        />
        <div>
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
      </div>
      <span className={`verification-status ${user.verified ? "verified" : "unverified"}`}>
        {user.verified ? <FaCheck /> : <FaTimes />}
      </span>
      <div className="action-buttons">
        <button onClick={() => verifyUser(user.id)} className="button-primary">
          {t("Verify")}
        </button>
        <button onClick={() => deleteUser(user.id)} className="button-black">
          {t("Delete")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="users-page-container">
      {/* Right-side image section */}
      <div className="right-side-image-container"></div>
      <div className="right-side-image">
        <img
          src="https://i.pinimg.com/originals/2e/fa/74/2efa7485320e4e8ead33bad9e03106d9.gif" // replace with actual image URL
          alt={t("User Management Illustration")}
          className="right-image"
        />
      </div>
      <div className="users-page">
        <header className="admin-header">
          <h1>{t("User Verification Panel")}</h1>
          <p>{t("Manage users by verifying their accounts and reviewing their roles.")}</p>
        </header>

        <div className="search-sort-bar">
          <input
            type="text"
            placeholder={t("Search by name, citizenship number, or email")}
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="bulk-actions">
          <button onClick={() => bulkAction("verify")} className="button-primary">
            {t("Verify Selected")}
          </button>
          <button onClick={() => bulkAction("delete")} className="button-black">
            {t("Delete Selected")}
          </button>
        </div>

        <div className="users-list">
          {currentUsers.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </div>

        {/* User Details Modal */}
        {showModal && (
          <div className="user-modal">
            <div className="modal-content">
              <img
                src={
                  showModal.profilePic ||
                  "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
                }
                alt={t("Profile")}
                className="modal-profile-pic"
              />
              <h2>{showModal.name}</h2>
              <p>{t("Email")}: {showModal.email}</p>
              <p>{t("Citizenship Number")}: {showModal.citizenshipNumber}</p>
              <button onClick={() => setShowModal(null)} className="close-modal">
                {t("Close")}
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
