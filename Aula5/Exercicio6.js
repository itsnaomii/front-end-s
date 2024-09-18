//6 - Dado um array de numeros, crie uma função assincrona que multiplique por 2 cada
//numero e retorne um novo array com os resultados.

function multi(number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(number * 2), 500)
  })
}

async function myAsyncFunction() {
  let number = [10, 20, 30, 40]
  return await Promise.all(number.map((num) => multi(num)))
}
myAsyncFunction().then(console.log)
