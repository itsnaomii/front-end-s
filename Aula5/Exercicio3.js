//crie uma função assincrona chamada divide que divide dois numeros,
//mas retorna uma Promise rejeitada se o divisor foi zero. Capture e
//exiba o erro usando try/catch.

function divide(a, b) {
  return new Promise((resolve, reject) => {
    if (b === 0) {
      reject("divisor não pode ser zero")
    } else {
      resolve(a / b)
    }
  })
}
async function performDivision() {
  try {
    const result = await divide(10, 0)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
performDivision()
