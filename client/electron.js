const dotenv = require('dotenv').config();
const electron = require('electron');
const mirrorConfig = require('./src/config.json');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
  mainWindow = new BrowserWindow({width: 1500, height: 1500});
  const url = mirrorConfig.setupComplete ? 'http://localhost:3000/dashboard' : 'http://localhost:3000/onboarding/welcome'
  mainWindow.loadURL(isDev ? url : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});