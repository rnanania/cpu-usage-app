// NOTE: Using os-utils instead of os from node so we dont have to deal with os.loadavg() and os.cpus().
const osUtils = require("os-utils");
const { createUsage, buildSeries, USAGE_INTERVAL, USAGE_BUFFER_LENGTH } = require("../utils/cpuUtils");

// NOTE: This can be moved to DB to persist.
let usageBuffer = [];
let usageLast = null;

// Initialize CPU usage and handle errors
try {
  osUtils.cpuUsage((v) => {
    usageLast = createUsage(v);
  });
} catch (err) {
  console.error("Error fetching initial CPU usage:", err);
}

// Update usage buffer every capture interval
const intervalId = setInterval(() => {
  try {
    osUtils.cpuUsage((v) => {
      const usageNow = createUsage(v);
      // NOTE: Performance can be improved here if needed.
      if (usageLast) {
        if (usageBuffer.length < USAGE_BUFFER_LENGTH) {
          usageBuffer.push(usageLast);
        } else {
          // Remove oldest and add new
          usageBuffer = [...usageBuffer.slice(1), usageLast];
        }
      }
      usageLast = { ...usageNow };
    });
  } catch (err) {
    console.error("Error fetching CPU usage:", err);
  }
}, USAGE_INTERVAL);

// Controller functions
const getUsageSeries = (req, res) => {
  res.json({
    series: buildSeries(usageBuffer, usageLast),
  });
};

const getUsageNow = (req, res) => {
  res.json(usageLast || {});
};

// Clean up function
const cleanUp = () => {
  clearInterval(intervalId); // Clear the interval
  console.log("Interval cleared. Shutting down...");
  process.exit(0);
};

// Gracefully shutdown on SIGINT (Ctrl+C) and SIGTERM (termination) signals
process.on("SIGINT", cleanUp);
process.on("SIGTERM", cleanUp);

module.exports = { getUsageSeries, getUsageNow };
