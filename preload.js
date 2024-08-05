const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  hello: () => ipcRenderer.send('send-message', "Oi"),
  answer: (message) => ipcRenderer.on('receive-message', message),
  openAbout: () => ipcRenderer.send('open-about'),
  info: () => ipcRenderer.send('dialog-info'),
  warning: () => ipcRenderer.send('dialog-warning'),
  select: () => ipcRenderer.send('dialog-select')
})

// Inserir data na página
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-br', options)
}

// Interagir diretamente no DOM do documento html (index.html)
window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})