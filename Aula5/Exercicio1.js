//crie uma funcao assincrona chamada getNumber que recebe um numero aleatorio
//e o multiplica por 100 após 1 segundo. Use await para esperar a resolucao da Promise e retorne o numero//

function sum() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random() * 100))
  }, 1000)
}

async function myAsyncFunction() {
  let number = await sum()
  console.log(number)
}

myAsyncFunction()
