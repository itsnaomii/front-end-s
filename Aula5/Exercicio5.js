//Crie uma função assincrona que simuloe uma processo de tres etapas encadeadas,
//cada uma demorando 1 segundo. Mostre a sequencia de execução.

function etapas(etapa) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(etapa), 1000)
  })
}

async function myAsyncFunction() {
  console.log(await etapas("etapa1"))
  console.log(await etapas("etapa2"))
  console.log(await etapas("etapa3"))
}
myAsyncFunction()
