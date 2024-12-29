import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { performance } from "perf_hooks";

// Import routers and middlewares
import authRouter from "./routers/auth";
import pollsRouter from "./routers/polls";
import usersRouter from "./routers/users";
import feedbackRouter from "./routers/feedback";
import statsRoutes from "./routes/statsRoutes";
import userRoutes from "./routes/users";
import electionRoutes, { initializeSocket } from "./routes/elections"; // Import initializeSocket
import bodyParser from "body-parser";
import { requestLogger, getErrorRate } from "./middlewares/requestLogger";

// Initialize Express app
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, // Allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(bodyParser.json());

// Routes
app.use("/auth", authRouter);
app.use("/polls", pollsRouter);
app.use("/users", usersRouter);
app.use("/feedback", feedbackRouter);
app.use("/api/users", userRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/stats", statsRoutes);

// Root route
app.get("/", (req: Request, res: Response) => {
  console.log(req.cookies);
  res.status(404).send("No link matched!");
});

// System Health Monitoring Route
app.get("/api/system-health", async (req: Request, res: Response) => {
  const start = performance.now();
  const uptime = process.uptime() / 3600;

  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate processing
  const apiResponseTime = performance.now() - start;
  const errorRate = getErrorRate();

  res.json({
    uptime,
    apiResponseTime: Math.round(apiResponseTime),
    errorRate,
  });
});

// Create HTTP server and initialize WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Enable CORS for WebSocket connections
    credentials: true,
  },
});

// Mock user data (replace with your database or user logic)
const userMap: Record<string, string> = {
  "0DbDOvteeBobD9QLAAAD": "Alice",
  "TJEYYEqaSNi50vNHAAAE": "Bob",
  "Mv1UrUyqI_A5hOGgAAAF": "Charlie",
  "k7EVAYmbUjRx1sJFAAAH": "David",
  "a03dT8TKAxM1xOguAAAJ": "Eve",
  // Add more mock users or replace with DB logic
};

// Online users tracking
let onlineUsers: Array<{ id: string; name: string; connectedAt: Date; status: string }> = [];

// WebSocket Connection Handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Fetch user details
  const userName = userMap[socket.id] || `Guest ${socket.id.substring(0, 6)}`; // Default to Guest if not mapped

  // Add user to online list
  const newUser = {
    id: socket.id,
    name: userName,
    connectedAt: new Date(),
    status: "Online",
  };
  onlineUsers.push(newUser);

  // Emit updated user list
  io.emit("update_online_users", onlineUsers);

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`admin disconnected: ${socket.id}`);

    // Update the user's status to offline
    onlineUsers = onlineUsers.map((user) =>
      user.id === socket.id ? { ...user, status: "Offline" } : user
    );

    // Emit updated user list
    io.emit("update_online_users", onlineUsers);
  });

  // Handle user action (edit, view, deactivate)
  socket.on("user_action", (data) => {
    const { userId, action } = data;

    if (action === "deactivate") {
      // Find the user and change their status
      const user = onlineUsers.find((user) => user.id === userId);
      if (user) {
        user.status = "Deactivated"; // Deactivate user
        // Broadcast the updated users list to all clients
        io.emit("update_online_users", onlineUsers);
      }
    }

    // Additional actions like "edit" or "view" can be handled here
    if (action === "edit") {
      // Handle editing logic (if required)
      console.log(`User ${userId} is being edited.`);
      io.emit("user_edited", { userId });
    }

    if (action === "view") {
      // Handle view logic (if required)
      console.log(`User ${userId} is being viewed.`);
      io.emit("user_viewed", { userId });
    }
  });
});

// Initialize socket functionality for elections
initializeSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
