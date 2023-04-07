const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {

    win = new BrowserWindow({

        hidth: 600,
        weight: 600,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assests/logo.png`

    })

    win.loadURL(`file://${__dirname}/dist/index.html`)

    //// uncomment to open DevTools
    // win.webContents.openDevTools()

    win.on('closed', function () {

        win = null

    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit()
    }

})

app.on('activate', function () {

    if (win === null) {
        createWindow()
    }

})
