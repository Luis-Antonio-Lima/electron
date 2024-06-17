/**
 * Processo de renderização do documento
 */

console.log("Processo de renderização")

console.log(`Node: ${api.node()}`)
console.log(`Chrome: ${api.chrome()}`)
console.log(`Electron: ${api.electron()}`)
api.hello()

// Função que é executada quando o botão for clicado
function sobre() {
    api.openAbout()
}