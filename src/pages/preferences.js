const electron = require('electron')
const ipc = electron.ipcRenderer
const shell = electron.shell
const settings = require('electron-settings')

function setSetting(setting) {
  const currentValue = getSetting(setting)
  const value = currentValue ? !currentValue : true
  settings.set(setting, value)
  ipc.send('setting-change', setting, value)
}

function getSetting(setting) {
  return settings.get(setting)
}

function loadSettings() {
  const allSettings = settings.getAll()
  const keys = Object.keys(allSettings)
  keys.forEach(key => {
    const setting = document.querySelector(`.${key}`)
    if (setting.type === 'checkbox') {
      setting.checked = allSettings[key]
    } else {
      setting.value = allSettings[key]
    }
  })
}

document.querySelectorAll('.link-external').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    shell.openExternal(e.target.href)
  })
})

loadSettings()
