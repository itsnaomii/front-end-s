//crie uma função assincrona chamada sum onde o primeiro valor da parcela é
//70 e o segundo valor sera passado como argumento para a função. O atraso
//deve ser de 1 segundo. use await para esperar a resolução da Promise e
//retorne o ressultado da soma.

function sum(number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(70 + number), 1000)
  })
}
async function myAsyncFunction() {
  let number = await sum(35)
  console.log(number)
}
myAsyncFunction()
