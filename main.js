//console.log("Processo Principal")

const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron')

// Janela principal
const createWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 800, //largura
        height: 600, //altura
        resizable: false, //evitar o redimensionamento
        //titleBarStyle: 'hidden', //esconder barra de título e menu
        //autoHideMenuBar: true, //esconder o menu
        icon: './src/public/img/pc.png'
    })

    // Iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// Janela Sobre

const aboutWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 360, //largura
        height: 200, //altura
        resizable: false, //evitar o redimensionamento
        //titleBarStyle: 'hidden', //esconder barra de título e menu
        autoHideMenuBar: true, //esconder o menu
        icon: './src/public/img/pc.png'
    })

    about.loadFile('./src/views/sobre.html')
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