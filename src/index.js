const { app, BrowserWindow, ipcMain } = require('electron');
const dialogModule = require('./dialogs.js');

const env = process.env.NODE_ENV || 'production';
const nbind = require('nbind');
const lib = nbind.init().lib;
const MyPromice=lib.MyPromice;

// See https://stackoverflow.com/a/33067955, by Stijn de Witt
function moduleAvailable (name) {
  try {
      require.resolve (name);
      return true;
  } catch (e) {
      // empty
  }

  return false;
}

// Query for your particular module
if (moduleAvailable ("electron-debug")) require ("electron-debug") ({showDevTools:false});


// Generic on development configuration
if (env === 'dev' || env === 'debug') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow();
  mainWindow.setMenu(null);
  mainWindow.maximize();

  // eslint-disable-next-line new-cap
  const dialogsHelper = new dialogModule(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/ui/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  MyPromice.exec();
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('before-quit', () => {
  if (xmpp) {
    xmpp.disconnect();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('SIGINT', () => {
  if (xmpp) {
    xmpp.disconnect();
  }
  process.exit(0);
});