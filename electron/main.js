const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

let mainWindow = null;

async function createWindow() {
  const nestProcess = spawn('npm', ['run', 'start:dev'], {
    cwd: path.join(__dirname, '../backend'),
    shell: true,
    stdio: 'inherit',
  });

  const nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, '../frontend'),
    shell: true,
  });
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  nextProcess.stdout.on('data', (data) => {
    const message = data.toString();
    console.log('[Next.js]:', message);

    if (message.includes('http://localhost:3000')) {
      mainWindow.loadURL('http://localhost:3000');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    nextProcess.kill();
    nestProcess.kill();
  });
}

app.on('ready', createWindow);