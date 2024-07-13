const dayjs = require("dayjs");

// NOTE: This can be moved to config file.
const USAGE_INTERVAL = 10_000; // Every 10 Seconds capture the CPU usage
const USAGE_MAX = 10 * 60 * 1_000; // 10 minutes window of cpu usage
const USAGE_BUFFER_LENGTH = parseInt(USAGE_MAX / USAGE_INTERVAL);

const createUsage = (cpuUsage) => {
  const timestamp = Date.now();
  const time = dayjs(timestamp).format("HH:mm:ss");
  return { timestamp, cpuUsage, time };
};

// Always send the series and current cpu usage so client dont miss any usage.
// Just make sure not to return duplicate item in it.
const buildSeries = (series, current) => {
  const lastItem = series.length ? series[series.length - 1] : {};
  const returnLastToo = current && lastItem.timestamp !== current.timestamp;
  return returnLastToo ? [...series, { ...current }].slice(-1 * USAGE_BUFFER_LENGTH) : [...series];
};

module.exports = { createUsage, buildSeries, USAGE_INTERVAL, USAGE_BUFFER_LENGTH };
