const readline = require("readline")

const iface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

iface.question("informe o seu nome: ", (nome) => {
  iface.question("informe o seu salario: ", (salario) => {
    console.log(`A ${nome} recebe R$${salario} por mes. `)

    iface.close()
  })
})
//c
