const express = require("express");
const {
  getUsageSeries,
  getUsageNow,
} = require("../controllers/cpuUsageController");

const router = express.Router();

// Routes
router.get("/cpu-usage-series", getUsageSeries);
router.get("/cpu-usage-now", getUsageNow);

module.exports = { cpuUsageRoutes: router };
