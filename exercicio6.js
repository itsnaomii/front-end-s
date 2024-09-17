// faça um programa que leia um numero inteiro e mostre o seu antecessor e seu sucessor
const readline = require('readline'); 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Digite um numero: ', (numero) => {
  const num = parseInt(numero)
  const antecessor = num - 1 
  const sucessor = num + 1 
  console.log(` O antecessor de ${num} é ${antecessor} e o sucessor é ${sucessor}. `)

  rl.close()
})
//c


