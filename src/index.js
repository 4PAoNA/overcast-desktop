const electron = require('electron')
const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const path = require('path')
const fs = require('fs')
const url = require('url')
const menu = require('./menu')
const settings = require('electron-settings')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray

function createWindow () {
  win = new BrowserWindow({
    width: 380,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'browser.js')
    }
  })

  win.loadURL('https://overcast.fm/')

  // Open the DevTools.
  win.webContents.openDevTools()

  win.webContents.on('did-finish-load', () => {
    if (settings.get('dark-mode') === true) {
      win.webContents.insertCSS(fs.readFileSync(path.join(__dirname, 'styles/style.css'), 'utf8'))
    }
  })

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createTray () {
  tray = new Tray(path.join(__dirname, 'assets/images/logo.png'))
  tray.setPressedImage(path.join(__dirname, 'assets/images/logo-pressed.png'))
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'}
  ])
  tray.setContextMenu(contextMenu)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  electron.Menu.setApplicationMenu(menu.build())
  createWindow()
  if (settings.get('tray-icon')) createTray()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
