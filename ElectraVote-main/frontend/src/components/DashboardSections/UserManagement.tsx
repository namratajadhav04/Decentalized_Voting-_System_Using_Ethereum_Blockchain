import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./UserManagement.scss";

// Initialize the socket connection
const socket = io("http://localhost:5000");

interface User {
  id: string;
  name: string;
  connectedAt: string;
  status: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    // Listener to update users list
    const handleUpdateOnlineUsers = (data: User[]) => {
      // Deduplicate users by their ID
      const uniqueUsers = data.filter(
        (user, index, self) =>
          index === self.findIndex((u) => u.id === user.id)
      );
      setUsers(uniqueUsers);
      setLoading(false);  // Set loading to false after data is received
    };

    socket.on("update_online_users", handleUpdateOnlineUsers);

    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off("update_online_users", handleUpdateOnlineUsers);
    };
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Sorting
  const handleSort = (column: string) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (column === "name") return a.name.localeCompare(b.name);
      if (column === "connectedAt")
        return new Date(a.connectedAt).getTime() - new Date(b.connectedAt).getTime();
      return 0;
    });
    setUsers(sortedUsers);
  };

  // Handle Action (Edit, View, Deactivate)
  const handleAction = (userId: string, action: string) => {
    // Send the action request to the server
    socket.emit("user_action", { userId, action });

    // Optimistic UI update - update user status in real-time
    if (action === "deactivate") {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: "Deactivated" } : user
        )
      );
    }
  };

  return (
    <div className="user-management">
      <header>
        <h1>User Management</h1>
        <input
          type="text"
          placeholder="🔍 Search Users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <section className="user-list">
          <h2>Users ({filteredUsers.length})</h2>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>User Name</th>
                <th onClick={() => handleSort("connectedAt")}>Connected At</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={user.status.toLowerCase()}>
                  <td>{user.name}</td>
                  <td>{new Date(user.connectedAt).toLocaleString()}</td>
                  <td>
                    <span
                      className={`status-indicator ${user.status.toLowerCase()}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleAction(user.id, "edit")}>Edit</button>
                    <button onClick={() => handleAction(user.id, "view")}>View</button>
                    <button onClick={() => handleAction(user.id, "deactivate")}>Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default UserManagement;
