const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const windowStateKeeper = require('electron-window-state');
require('electron-reload')(path.join(__dirname, "output"));

const app = electron.app;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin'){
    app.quit();
  }
});

app.on('ready', () => {

  function makeWindow(url, config){
    let win = new BrowserWindow(config);
    win.loadURL(url);
    win.on('closed', () => {
      win = null;
    });
    return win;
  }

  // main window
  let mainWindowState = windowStateKeeper({
    maximize: true,
    file: 'mainWindowState.json'
  });
  let mainWindow = makeWindow(`file://${__dirname }/index.html`, {
    frame: false,
    x: mainWindowState.x,
    y: mainWindowState.y,
    height: mainWindowState.height,
    width: mainWindowState.width
  });
  mainWindowState.manage(mainWindow);

  // score board window
  let boardWindowState = windowStateKeeper({
    maximize: true,
    file: 'boardWindowState.json'
  });
  let boardWindow = makeWindow(`file://${__dirname }/board.html`, {
    frame: false,
    x: boardWindowState.x,
    y: boardWindowState.y,
    height: boardWindowState.height,
    width: boardWindowState.width
  });
  boardWindowState.manage(boardWindow);

});
