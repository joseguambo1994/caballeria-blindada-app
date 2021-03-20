const { BrowserWindow } = require('electron').remote
const win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')