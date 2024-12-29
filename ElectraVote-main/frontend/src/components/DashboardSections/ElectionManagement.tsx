import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import "./ElectionManagement.scss";

interface Election {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

const ElectionManagement: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [newElection, setNewElection] = useState({ name: "", startDate: "", endDate: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get("/api/elections");
        setElections(response.data);
      } catch (error) {
        console.error("Error fetching elections:", error);
        setError("Failed to fetch elections. Please try again later.");
      }
    };

    fetchElections();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewElection((prev) => ({ ...prev, [name]: value }));
  };

  const addElection = async () => {
    try {
      const response = await axios.post("/api/elections", newElection);
      setElections([...elections, response.data]);
      setNewElection({ name: "", startDate: "", endDate: "" });
      alert("New election added successfully!");
    } catch (error) {
      console.error("Error adding election:", error);
      setError("Failed to add election.");
    }
  };

  const closeElection = async (id: number) => {
    try {
      await axios.put(`/api/elections/${id}/close`);
      setElections(elections.map((e) => (e.id === id ? { ...e, status: "closed" } : e)));
      alert("Election closed successfully!");
    } catch (error) {
      console.error("Error closing election:", error);
      setError("Failed to close election.");
    }
  };

  const deleteElection = async (id: number) => {
    try {
      await axios.delete(`/api/elections/${id}`);
      setElections(elections.filter((e) => e.id !== id));
      alert("Election deleted successfully!");
    } catch (error) {
      console.error("Error deleting election:", error);
      setError("Failed to delete election.");
    }
  };

  return (
    <section className="election-management">
      <h2>Election Management</h2>
      {error && <div className="error">{error}</div>}
      <div className="new-election-form">
        <input
          type="text"
          name="name"
          placeholder="Election Name"
          value={newElection.name}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="startDate"
          value={newElection.startDate}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="endDate"
          value={newElection.endDate}
          onChange={handleInputChange}
        />
        <button onClick={addElection} className="add-btn">
          Add Election
        </button>
      </div>
      <table className="election-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {elections.map((election) => (
            <tr key={election.id}>
              <td>{election.id}</td>
              <td>{election.name}</td>
              <td>{election.status}</td>
              <td>{election.startDate}</td>
              <td>{election.endDate}</td>
              <td>
                {election.status === "ongoing" && (
                  <button onClick={() => closeElection(election.id)} className="close-btn">
                    Close
                  </button>
                )}
                <button onClick={() => deleteElection(election.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ElectionManagement;
