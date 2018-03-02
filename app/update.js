// @flow
import { BrowserWindow } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export default class UpdateBuilder {
  mainWindow: BrowserWindow;
  logger: log;

  constructor(mainWindow: BrowserWindow, logger: log) {
    this.mainWindow = mainWindow;
    this.logger = logger;
  }

  buildUpdater() {
    autoUpdater.logger = this.logger;
    autoUpdater.logger.transports.file.level = 'info';

    if (process.env.NODE_ENV !== 'development') {
      autoUpdater.checkForUpdates();
    }

    autoUpdater.on('update-available', (info) => {
      this.sendStatusToWindow(`Update available. ${info}`);
    });

    autoUpdater.on('update-not-available', (info) => {
      this.sendStatusToWindow(`Update not available. ${info}`);
    });

    autoUpdater.on('error', (err) => {
      this.sendStatusToWindow(`Error in auto-updater. ${err}`);
    });

    autoUpdater.on('download-progress', (progressObj) => {
      this.sendStatusToWindow(`Download progress... ${progressObj}`);
    });

    autoUpdater.on('update-downloaded', (info) => {
      // Wait 5 seconds, then quit and install
      // In your application, you don't need to wait 5 seconds.
      // You could call autoUpdater.quitAndInstall(); immediately
      this.sendStatusToWindow(`Update downloaded; will install in 5 seconds ${info}`);

      setTimeout(() => {
        autoUpdater.quitAndInstall();
      }, 5000);
    });
  }

  sendStatusToWindow(text: string) {
    log.info(text);
    this.mainWindow.webContents.send('message', text);
  }
}
