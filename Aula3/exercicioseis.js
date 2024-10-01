/*crie uma função que adiciona um elemento ao 
inicio do array e remove o ultimo elemento*/

const readline = require('readline')

const listaFrutas = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let frutas = ['maça', 'laranja', 'abacaxi', 'morango',]

listaFrutas.question("adicione uma fruta ao inicio da lista: ", (novaFruta) => {
 frutas.unshift(novaFruta) //adiciona a nova fruta no inicio 
 frutas.pop() //remove o ultimo elemento
 console.log("lista das frutas atualizada", frutas)
 listaFrutas.close()
})