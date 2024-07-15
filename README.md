# cpu-usage-app
CPU usage monitoring web app using NodeJS & React.

## Further Improvements
- I have NOTE across the app which can be improved by investing more time into this app.
- I would like to add End to End Cypress test to have an automation around testing.
- Performance improvemnt
- Think about scalability and show more data on UI.

## Structure

- **`cpu-usage-client`**: Client code
- **`cpu-usage-server`**: Server code

## Server setup

1. **Installation**

   Ensure you have Node.js and npm installed on your machine.

   ```bash
   cd cpu-usage-server
   npm install
   ```

2. **Run the Server**

   Start the Express server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:5000` by default.

## Client setup

1. **Installation**

   Ensure you have Node.js and npm installed on your machine.

   ```bash
   cd cpu-usage-server
   npm install
   ```

2. **Run the Server**

   Start the react client app:

   ```bash
   npm run dev
   ```

   The client will start at `http://localhost:5173` by default.

## Screenshots

### Inital Load
![Initial App load Light Mode](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Initial-Light-Mode.png)

### Inital Load dark mode
![Initial App load Dark Mode](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Initial-Dark-Mode.png)

### CPU usage history fetch error handling
![CPU Usage data series fetch error handling](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Error-Handling-Fetch.png)

### CPU usage update fetch error handling
![CPU Usage data update error handling](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Error-Handling-Update.png)

### CPU usage random high/low usage
![CPU Usage Hig/Low Light Mode](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/CPU-Usage-High-Low.png)

### CPU usage random high/low usage dark mode
![CPU Usage Hig/Low Dark Mode](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/CPU-Usage-Higg-Low-Dark.png)

### CPU usage under load alert
![CPU Usage under load alert](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Under-Load-Recovery-1.png)

### CPU usage recovery & under load alert
![CPU Usage under load & recovery alert](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Under-Load-Recovery-2.png)

### Mobile screen look and feel
![Mobile screen](https://github.com/rnanania/cpu-usage-app/blob/main/screenshots/Mobile-Screen.png)

