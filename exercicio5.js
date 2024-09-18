/* Faça um programa que leia as duas notas de um aluno em 
uma materia e mostre na tela a sua media na disciplina*/

const readline = require('readline'); 

const iface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

iface.question('informe a primeira nota: ', (nota1) => {
    iface.question('informe a segundo nota: ', (nota2) => {
      const media = ((nota1 + nota2) / 2)
      console.log(`Media do aluno: ${media} `)
      iface.close()
  }) 

})
//?