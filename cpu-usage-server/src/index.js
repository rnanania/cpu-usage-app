const express = require("express");
const cors = require("cors");
const { cpuUsageRoutes } = require("./routes/cpuUsageRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors());

// Routes
app.use("/api", cpuUsageRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
