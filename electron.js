const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    webPreferences: {
      nodeIntegration: false,   // Keep it false for security
      contextIsolation: true,   // Isolate context for security
    },
  });

  // Load the build/index.html using absolute file paths
  const startUrl = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    : process.env.ELECTRON_START_URL || 'http://localhost:3000';
console.log(startUrl, 'sur')
win.loadURL(startUrl);
  // Open DevTools (optional, for debugging)
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
