const { BrowserWindow } = require('electron');

const defaultOptions = {
  webPreferences: {
    nodeIntegration: true,
  },
};

class Window extends BrowserWindow {
  constructor({ file, ...options }) {
    super({ ...defaultOptions, ...options });

    this.loadFile(file);

    this.on('ready-to-show', () => {
      this.show();
    });
  }
}

module.exports = Window;
