/*crie uma função que remova o primeiro elemento de um array*/

let graos = ['arroz', 'feijão', 'lentilha']

const removerInicioGraos = () => {
    graos.shift()
    console.log(graos)
}

removerInicioGraos()