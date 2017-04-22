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

  function makeWindow(url, state, config){
    let winState = windowStateKeeper(state);
    let win = new BrowserWindow( Object.assign({}, config, {
      x: winState.x,
      y: winState.y,
      height: winState.height,
      width: winState.width,
      fullscreen: winState.isFullScreen
    }) );
    winState.manage(win)
    win.loadURL(url);
    win.on('closed', () => {
      win = null;
    });
    return win;
  }

  // main window
  let mainWindow = makeWindow(`file://${ __dirname }/index.html`, {
    maximize: true,
    file: 'mainWindowState.json'
  }, {
    frame: true
  });

  // score board window
  let boardWindow = makeWindow(`file://${ __dirname }/board.html`, {
    fullscreen: true,
    file: 'boardWindowState.json'
  },{
    frame: false
  });

});
