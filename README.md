# cpu-usage-app
CPU usage monitoring web app using NodeJS & React.

## Further Improvements
- Performance improvemnt
- Further work around scalability to show more data points on UI.
- Testing - Heart of this app is in this file `cpu-usage-client/src/utils/cpu-usage-options.ts` so I have just tested this file only using chatgpt & Jest. More RTL and Cypress test can be added to improve further in this area.
- I have added NOTE across the app which can be improved by investing more time into this app.

## Structure

- **`cpu-usage-client`**: Client code
- **`cpu-usage-server`**: Server code

## Prerequisite
Please Ensure you have Node.js(>=20.12.1) and npm(>=10.5.0) installed on your 

## Server setup

1. **Installation**

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

