const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // Load the index.html file
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

// app.handleHTTPPayment = async function (data) {
//   try {
//       // Make a POST request to the backend server with the received data
//       const response = await axios.post('http://localhost:5000/pay', data);
//       return response.data; // Return the response data to the caller
//   } catch (error) {
//       throw error; // Throw any errors encountered during the request
//   }
// };

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
      createWindow();
  }
});