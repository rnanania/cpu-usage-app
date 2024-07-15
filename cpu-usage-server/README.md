# CPU Usage Monitoring Application Server

This application monitors CPU usage using Node.js with Express.js and `os-utils`. It captures CPU usage data at regular intervals and provides endpoints to fetch the current CPU usage and a series of historical CPU usage data.

## Setup

1. **Installation**

   Ensure you have Node.js and npm installed on your machine.

   ```bash
   npm install
   ```

2. **Run the Server**

   Start the Express server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:5000` by default.

## Structure

- **`index.js`**: Entry point of the application, initializes Express server and routes.
- **`controllers/cpuUsageController.js`**: Handles routes related to CPU usage monitoring.
- **`utils/cpuUtils.js`**: Utility functions for creating CPU usage data.

## Routes

### `GET /api/cpu-usage-series`

- **Description**: Returns a series of historical CPU usage data captured at regular intervals.
- **Response**:
  ```json
  {
    "series": [
      {
        "timestamp": 1626206262248,
        "cpuUsage": 0.75,
        "time": "12:34:22"
      },
      {
        "timestamp": 1626206272248,
        "cpuUsage": 0.78,
        "time": "12:34:32"
      },
      ...
    ]
  }
  ```

### `GET /api/cpu-usage-now`

- **Description**: Returns the current CPU usage.
- **Response**:
  ```json
  {
    "timestamp": 1626206272248,
    "cpuUsage": 0.78,
    "time": "12:34:32"
  }
  ```

## Controller (`cpuUsageController.js`)

Handles CPU usage related endpoints and data processing.

## Utils (`cpuUtils.js`)

Utility functions for CPU usage data processing.

## Dependencies

- **`express`**: For creating the web server and handling HTTP requests.
- **`os-utils`**: For retrieving CPU usage data without dealing directly with `os` module methods like `os.loadavg()` and `os.cpus()`.
- **`dayjs`**: Fast 2kB alternative to Moment.js with the same modern API.

---

This README provides an overview of the CPU usage monitoring application, its structure, setup instructions, endpoints, and explanations of key components such as controllers and utility functions. Adjust paths, port numbers, and detailed descriptions as per your specific application setup and requirements.