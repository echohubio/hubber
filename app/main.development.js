import { app, shell, BrowserWindow, Menu } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import path from 'path';
import url from 'url';

let menu;
let win;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line global-require,
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require, import/no-extraneous-dependencies
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const installer = require('electron-devtools-installer'); // eslint-disable-line global-require, import/no-extraneous-dependencies

  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];

  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  // TODO: Use async interation statement.
  //       Waiting on https://github.com/tc39/proposal-async-iteration
  //       Promises will fail silently, which isn't what we want in development
  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.error);
};

const darwinMenu = () => (
  [
    {
      label: 'Hubber',
      submenu: [
        {
          label: 'About Hubber',
          selector: 'orderFrontStandardAboutPanel:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Services',
          submenu: [],
        },
        {
          type: 'separator',
        },
        {
          label: 'Hide Hubber',
          accelerator: 'Command+H',
          selector: 'hide:',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:',
        },
        {
          label: 'Show All',
          selector: 'unhideAllApplications:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:',
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:',
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:',
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:',
        },
      ],
    },
    {
      label: 'View',
      submenu: (process.env.NODE_ENV === 'development') ? [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click() {
            win.webContents.reload();
          },
        }, {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click() {
            win.setFullScreen(!win.isFullScreen());
          },
        }, {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click() {
            win.toggleDevTools();
          },
        },
      ] :
      [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click() {
            win.setFullScreen(!win.isFullScreen());
          },
        },
      ],
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:',
        }, {
          label: 'Close',
          accelerator: 'Command+W',
          selector: 'performClose:',
        }, {
          type: 'separator',
        }, {
          label: 'Bring All to Front',
          selector: 'arrangeInFront:',
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('http://electron.atom.io');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          },
        },
      ],
    },
  ]
);

const otherMenu = () => (
  [
    {
      label: '&File',
      submenu: [
        {
          label: '&Open',
          accelerator: 'Ctrl+O',
        }, {
          label: '&Close',
          accelerator: 'Ctrl+W',
          click() {
            win.close();
          },
        },
      ],
    },
    {
      label: '&View',
      submenu: (process.env.NODE_ENV === 'development') ? [
        {
          label: '&Reload',
          accelerator: 'Ctrl+R',
          click() {
            win.webContents.reload();
          },
        },
        {
          label: 'Toggle &Full Screen',
          accelerator: 'F11',
          click() {
            win.setFullScreen(!win.isFullScreen());
          },
        },
        {
          label: 'Toggle &Developer Tools',
          accelerator: 'Alt+Ctrl+I',
          click() {
            win.toggleDevTools();
          },
        },
      ] :
      [
        {
          label: 'Toggle &Full Screen',
          accelerator: 'F11',
          click() {
            win.setFullScreen(!win.isFullScreen());
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('http://electron.atom.io');
          },
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
          },
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://discuss.atom.io/c/electron');
          },
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/atom/electron/issues');
          },
        },
      ],
    },
  ]
);

const createMenus = () => {
  if (process.platform === 'darwin') {
    const template = darwinMenu();
    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    const template = otherMenu();
    menu = Menu.buildFromTemplate(template);
    win.setMenu(menu);
  }
};

const createWindow = () => {
  win = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true,
  }));

  win.webContents.on('did-finish-load', () => {
    win.show();
    win.focus();
  });

  win.on('closed', () => {
    win = null;
  });

  if (process.env.NODE_ENV === 'development') {
    win.openDevTools();
    win.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          win.inspectElement(x, y);
        },
      }]).popup(win);
    });
  }

  createMenus();
};

app.on('ready', async () => {
  await installExtensions();

  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
