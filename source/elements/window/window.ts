import { remote } from 'electron';

export class Window {
  title: string = "App";

  tryCloseWindow() {
    this.closeWindow();
  }

  minimizeWindow() {
    const window: Electron.BrowserWindow = remote.getCurrentWindow();
    window.minimize();
  }

  maximizeWindow() {
    const window: Electron.BrowserWindow = remote.getCurrentWindow();
    if (window.isMaximized()) { window.unmaximize(); }
    else { window.maximize(); }
  }

  closeWindow() {
    const window: Electron.BrowserWindow = remote.getCurrentWindow();
    window.close();
  }

  showHelp() {
    remote.getCurrentWindow().webContents.openDevTools();
  }
}
