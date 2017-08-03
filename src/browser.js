const electron = require('electron')
const ipc = electron.ipcRenderer

ipc.on('goto-home', () => {
  window.location = 'https://overcast.fm/podcasts'
})

ipc.on('goto-episodes', () => {
  if (window.location.pathname !== '/podcasts') {
    window.location = 'https://overcast.fm/podcasts'
  }
  window.scrollTo(0, 0)
})

ipc.on('goto-podcasts', () => {
  if (window.location.pathname !== '/podcasts') {
    window.location = 'https://overcast.fm/podcasts'
  }
  const podcasts = document.querySelectorAll('h2.ocseparatorbar')[1]
  window.scrollTo(0, podcasts.getBoundingClientRect().top + window.scrollY - 25)
})

ipc.on('goto-account', () => {
  window.location = 'https://overcast.fm/account'
})
