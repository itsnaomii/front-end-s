//7- Crie uma função assincrona que simula a contagem regressiva
//usando um loop while, com atraso de 1 segundo entre cada numero.

function contagem(numero) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(numero), 1000)
  })
}

async function myAsyncFunction() {
  let numero = 10
  while (numero >= 1) {
    console.log(numero)
    await contagem(numero)
    numero--
  }
}
myAsyncFunction()
