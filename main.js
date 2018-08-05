var _a = require("electron"), app = _a.app, BrowserWindow = _a.BrowserWindow, Menu = _a.Menu, Tray = _a.Tray;
var path = require("path");
var url = require("url");
var tray = null;
var win = null;
// detect serve mode
var args = process.argv.slice(1);
var serve = args.some(function (val) { return val === '--serve'; });
function appStart() {
    createWindow();
    createTray();
}
function createTray() {
    // tray
    tray = new Tray(path.join(__dirname, "/dist/favicon.ico"));
    tray.setToolTip('Report Organizer');
    updateTrayMenu();
    tray.on('click', showWindow);
}
function updateTrayMenu() {
    if (tray) {
        var contextMenu = Menu.buildFromTemplate([
            {
                label: 'Devtools',
                type: 'checkbox',
                enabled: !!win,
                click: toggleDevTools
            },
            {
                label: 'Close',
                click: function () {
                    app.quit();
                }
            }
        ]);
        tray.setContextMenu(contextMenu);
    }
}
function createWindow() {
    if (!win) {
        // set show - true if you need to open window after app start.
        win = new BrowserWindow({ width: 800, height: 600, show: false });
        if (serve) {
            // get dynamic version from localhost:4200
            require('electron-reload')(__dirname, {
                electron: require(__dirname + "/node_modules/electron")
            });
            win.loadURL('http://localhost:4200');
        }
        else {
            // load the dist folder from Angular
            win.loadURL(url.format({
                pathname: path.join(__dirname, "/dist/index.html"),
                protocol: "file:",
                slashes: true,
                icon: path.join(__dirname, 'assets/icons/favicon.png')
            }));
        }
        // The following is optional and will open the DevTools:
        // win.webContents.openDevTools()
        win.on('closed', function () {
            win = null;
            updateTrayMenu();
        });
        updateTrayMenu();
    }
}
function toggleDevTools() {
    win && win.webContents && win.webContents.toggleDevTools();
}
function showWindow() {
    if (!win) {
        createWindow();
    }
    if (!win.isVisible()) {
        win && win.show();
    }
    else {
        win && win.hide();
    }
}
app.on("ready", appStart);
// callback should be empty if we need to leave main process alive after all window close
app.on("window-all-closed", function () { });
// initialize the app's main window
app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
