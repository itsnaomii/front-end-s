const readline = require('readline'); 

const iface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

iface.question('informe o primeiro numero: ', (num1) => {
    iface.question('informe o segundo numero: ', (num2) => {
      console.log(`A soma entre ${parseInt(num1)} e ${parseInt(num2)} é igual a ${parseInt(num1) + parseInt(num2)} `)
      iface.close()
   
        
         
         })
        })
        //c
