//Crie uma função que adiciona um elemento
 //no inicio de um array//
 
 const readline = require('readline')

 const listaNumero = readline.createInterface({
   input: process.stdin,
   output: process.stdout
 })

 let numeros = [2, 3, 4, 5, 6.]

 listaNumero.question("adicione um numero ao inicio: ", (numero) => {
  numeros.unshift(Number(numero))
  console.log("lista de numero atualizada", numeros)
  listaNumero.close()
 })
 