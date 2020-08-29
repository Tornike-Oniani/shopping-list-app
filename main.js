const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let addWindow;

// Handle create add window
function createAddWindow() {
  // 1. Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Item',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 2. Load html
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'pages', 'add.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // Garbage collection handle
  addWindow.on('close', () => {
    addWindow = null;
  });
}

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        },
      },
      {
        label: 'Clear items',
        click() {
          mainWindow.webContents.send('items:clear');
        },
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
];

// Listen for app to be ready
app.on('ready', () => {
  // 1. Create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // 2. Load html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'pages', 'home.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  //* Quit app when main window gets closed
  mainWindow.on('closed', () => {
    app.quit();
  });

  // 3. Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // 4. Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Catch item:add
ipcMain.on('item:add', (e, item) => {
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});

// Add developer tools item if not in prod
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: 'reload',
      },
    ],
  });
}
