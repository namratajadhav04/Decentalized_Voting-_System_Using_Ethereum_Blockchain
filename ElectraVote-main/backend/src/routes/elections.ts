import { Router } from "express";
import { Server } from "socket.io";

const router = Router();

// Temporary in-memory data
let elections = [
  { id: 1, name: "Presidential Election", status: "ongoing", startDate: "2024-12-01", endDate: "2024-12-10" },
  { id: 2, name: "Governor Election", status: "closed", startDate: "2024-11-01", endDate: "2024-11-10" },
];

// WebSocket initialization
export const initializeSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Election socket connected: ${socket.id}`);

    // Handle real-time election updates
    socket.on("update_election", (data) => {
      console.log("Election update received:", data);

      // Broadcast the update to all connected clients
      io.emit("election_update", data);
    });

    socket.on("disconnect", () => {
      console.log(`Election socket disconnected: ${socket.id}`);
    });
  });
};

// Get elections
router.get("/", (req, res) => {
  res.json(elections);
});

// Add new election
router.post("/", (req, res) => {
  const { name, startDate, endDate } = req.body;
  const newElection = {
    id: elections.length + 1,
    name,
    status: "ongoing",
    startDate,
    endDate,
  };
  elections.push(newElection);

  // Emit the new election to all WebSocket clients
  req.app.get("io").emit("election_added", newElection);

  res.json(newElection);
});

// Close an election
router.put("/:id/close", (req, res) => {
  const { id } = req.params;
  const election = elections.find((e) => e.id === parseInt(id));
  if (election) {
    election.status = "closed";

    // Emit the updated election to all WebSocket clients
    req.app.get("io").emit("election_updated", election);

    res.json(election);
  } else {
    res.status(404).send("Election not found");
  }
});

// Delete an election
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  elections = elections.filter((e) => e.id !== parseInt(id));

  // Emit the deleted election ID to all WebSocket clients
  req.app.get("io").emit("election_deleted", { id: parseInt(id) });

  res.status(200).send("Election deleted");
});

export default router;
