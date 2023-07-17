const { contextBridge, ipcRenderer } = require('electron')

console.log('webviewPreload.js触发了')
try {
  contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer)
} catch (error) {
  console.error(error)
}
