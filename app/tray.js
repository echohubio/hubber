// @flow
import { app, Tray, Menu, BrowserWindow } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';

export default class TrayBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.toggleWindow = this.toggleWindow.bind(this);
  }

  buildTray() {
    const trayIcon = path.join(__dirname, 'icons', 'icon.png');
    const tray = new Tray(trayIcon);

    const menu = this.buildMenu();
    tray.setContextMenu(menu);

    tray.setToolTip('EchoHub Hubber');

    tray.on('click', this.toggleWindow);
    // tray.on('right-click', this.toggleWindow);
  }

  // getWindowPosition() {
  //   const windowBounds = mainWindow.getBounds();
  //   const trayBounds = tray.getBounds();

  //   // Center window horizontally below the tray icon
  //   const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2)); // eslint-disable-line no-mixed-operators

  //   // Position window 4 pixels vertically below the tray icon
  //   const y = Math.round(trayBounds.y + trayBounds.height + 4);

  //   return { x, y };
  // }

  showWindow() {
    // const position = getWindowPosition();
    // mainWindow.setPosition(position.x, position.y, false);
    this.mainWindow.show();
    this.mainWindow.focus();
  }

  toggleWindow() {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.showWindow();
    }
  }

  buildMenu() { // eslint-disable-line class-methods-use-this
    const menuTemplate = [
      { label: 'Quit', click: () => { app.quit(); } },
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);

    return menu;
  }
}
