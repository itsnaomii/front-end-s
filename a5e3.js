//crie uma função assincrona chamada divide que divide dois numeros,
//mas retorna uma Promise rejeitada se o divisor foi zero. Capture e
//exiba o erro usando try/catch.

 function divide(a, b){
return new Promise((resolve, reject) => {
    if (b === 0) {
        reject('divisor for zero')
    }
else
})}

