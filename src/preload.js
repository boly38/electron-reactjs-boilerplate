const { contextBridge,ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
    /**
     * setup backend api url with good port
     * @param callback
     * @returns {Electron.IpcRenderer}
     */
    onUpdateBackendUrl: (callback) => ipcRenderer.on('update-backend-url', (_event, value) => callback(value))
});
console.log("*** preload is done");
