/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, ipcMain, BrowserWindow } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import log from 'electron-log';

import MenuBuilder from './menu';
import TrayBuilder from './tray';

log.transports.console.level = 'debug';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line global-require
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); // eslint-disable-line global-require
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer'); // eslint-disable-line global-require, import/no-extraneous-dependencies
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.error);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    console.error('did-fail-load');
    console.error(event);
    console.error(errorCode);
    console.error(errorDescription);
    console.error(validatedURL);
    console.error(isMainFrame);
  });

  mainWindow.webContents.on('crashed', (event, killed) => {
    console.error('crashed');
    console.error(event);
    console.error(killed);
  });

  mainWindow.webContents.on('plugin-crashed', (event, name, version) => {
    console.error('plugin-crashed');
    console.error(event);
    console.error(name);
    console.error(version);
  });

  app.on('gpu-process-crashed', () => {
    console.error('GPU Crash');
  });

  ipcMain.on('log', (event, arg) => {
    console.error(arg);
  });


  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  const trayBuilder = new TrayBuilder(mainWindow);
  trayBuilder.buildTray();
});

// app.on('activate', () => {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (this.mainWindow === null) {
//     createWindow();
//   }
// });
