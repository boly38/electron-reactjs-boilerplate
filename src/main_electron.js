import {app, BrowserWindow} from "electron";
import 'dotenv/config';
import path from "path";
import ApplicationConfig from '../src/config/ApplicationConfig.js';

let mainWindow;
try {
    const appConfig = ApplicationConfig.getInstance();
    const expressServer = appConfig.get("expressServer");
    const listenPort = await expressServer.listen();
    const width = process.env.ELECTRON_WIDTH || 1280;
    const height = process.env.ELECTRON_HEIGHT || 800;

    // location of front-end react-start or backend url in DEV mode
    const applicationUrl = process.env.ELECTRON_START_URL || `http://localhost:${listenPort}`;

    // location of front-end main file within electron ASAR package in PROD mode
    const applicationFile = process.env.ELECTRON_APPLICATION_FILE || 'ui/index.html';

    /**
     * IPC used to exchange between current electron main thread that open window ==> and (browser embed) react app : sending relevant backend api url (ie. port)
     * <a href="https://www.electronjs.org/docs/latest/tutorial/ipc">tutorial/ipc - doc</a>
     * @type {string}
     */
    const preloadFile = process.env.ELECTRON_PRELOAD_FILE || app.isPackaged ? 'src/preload.js' : 'preload.js';

    const createWindow = () => {
        try {
            const electronTarget = app.isPackaged ? applicationFile : applicationUrl;
            let preload = path.join(app.getAppPath(), preloadFile);// credit : https://github.com/electron/electron/issues/34131
            const webPreferences = { preload }; // not needed : nodeIntegration: true, contextIsolation: false,
            console.log(`createWindow ${width}x${height} isPackaged:${app.isPackaged} electronTarget:${electronTarget} webPreferences:`, webPreferences);
            mainWindow = new BrowserWindow({width, height, webPreferences, show: false});
            if (app.isPackaged) {
                mainWindow.loadFile(applicationFile);
            } else {
                mainWindow.loadURL(applicationUrl);
            }
            // Open the DevTools.
            if (process.env.ELECTRON_LAUNCH_DEVTOOLS === 'true') {
                mainWindow.webContents.openDevTools({mode: 'detach'});
            }
            mainWindow.once('ready-to-show', () => {
                mainWindow.show();
                console.log(`send update-backend-url:`, applicationUrl);
                mainWindow.webContents.send('update-backend-url', applicationUrl);
            } );
            mainWindow.on('closed', () => mainWindow = null);
        } catch (exception) {
            console.error("unable to createWindows", exception);
        }
    };
    app.commandLine.appendSwitch('--no-sandbox');// fix GPU process isn't usable. Goodbye.
    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            console.log("window-all-closed");
            app.quit();
            expressServer.stop();
        }
    });
    app.on('activate', () => {
        if (mainWindow === null) {
            console.log("activate");
            createWindow();
        }
    });

} catch (exception) {
    console.error(JSON.stringify(exception));
}
