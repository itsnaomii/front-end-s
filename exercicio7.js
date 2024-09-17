// faça um algoritmo que leia quanto dinheiro uma pessoa tem na carteira(em R$) e
// mostre quantos dólares ela pode comprar. considere US1,00= R$5,60//

const readline = require('readline'); 

const carteira = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

carteira.question('Quanto dinheiro voce tem na carteira? (em reais): ', (reais) => {
   const precoDolar = 5.60
   const dolar = reais / precoDolar
   console.log("Com R$" + reais + ", você pode comprar US$" + dolar + ".");
   carteira.close()
})
//c
      