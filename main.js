const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron')

// relacionado ao preload.js
const path = require('node:path')

// Janela principal
const createWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800, //largura
        height: 600, //altura
        resizable: false, //evitar o redimensionamento
        //titleBarStyle: 'hidden', //esconder barra de título e menu
        //autoHideMenuBar: true, //esconder o menu
        icon: './src/public/img/pc.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    })

    // Iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre

let about //Resolver bug de abertura de várias janelas

const aboutWindow = () => {
    // Se a janela about n estiver aberta (bug 1) abrir
    if (!about) {
        about = new BrowserWindow({
            width: 360, //largura
            height: 200, //altura
            resizable: false, //evitar o redimensionamento
            //titleBarStyle: 'hidden', //esconder barra de título e menu
            autoHideMenuBar: true, //esconder o menu
            icon: './src/public/img/pc.png'
        })
    }
    // nativeTheme.themeSource = 'dark'
    about.loadFile('./src/views/sobre.html')

    // bug 2 (reabrir a janela ao se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

//Janela secundaria
const childWindow = () => {
    // a linha abaixo obtém a janela pai (principal)
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const child = new BrowserWindow({
            width: 640,
            height: 450,
            icon: './src/public/img/pc.png',
            autoHideMenuBar: true,
            resizable: false,
            parent: father, //estabelece a relação parent-child
            modal: true
        })
        child.loadFile('./src/views/child.html')
    }
}

// executar de forma assincrona a aplicação
app.whenReady().then(() => {
    createWindow()
})


// Template do menu personalizado

const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Janela secundária',
                click: () => childWindow(),
                accelerator: 'Alt+F2'
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload',
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplicar zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir zoom',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            {
                label: 'Docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest/'),
                accelerator: 'Alt+F1'
            },
            {
                type: 'separator'
            },
            {
                label: 'Sobre',
                click: () => aboutWindow(),
            }
        ]
    },
]

// Processos
console.log("Processo Principal")
// Exemplo 1: Comando que só funciona no node.js
console.log(`Electron: ${process.versions.electron}`)
console.log(`Node: ${process.versions.node}`)

// Exemplo 2: Recebimento de uma mensagem do renderer
ipcMain.on(('send-message'), (event, message) => {
    console.log(`Processo principal recebeu uma mensagem: ${message}`)
    event.returnValue = 'oi'
})

// Exemplo 3: Recebimentodo renderer de uma ação a ser executada
ipcMain.on('open-about', () => {
    aboutWindow()
})