const electron = require('electron')
console.log('webviewPreload.js', electron.ipcRenderer)
window.ipcRenderer = electron.ipcRenderer
window.foo = 1
