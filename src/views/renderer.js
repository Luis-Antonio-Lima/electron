/**
 * Processo de renderização do documento
 */

console.log("Processo de renderização")

console.log(`Node: ${api.node()}`)
console.log(`Chrome: ${api.chrome()}`)
console.log(`Electron: ${api.electron()}`)
api.hello()

//recebimento de uma mensagem
api.answer((event, message) => {
    console.log(`Processo de renderização recebeu uma mensagem: ${message}`)
})

// Função que é executada quando o botão for clicado
function sobre() {
    api.openAbout()
}