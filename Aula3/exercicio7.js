/*Crie uma função que insere um elemnto em uma posição especifica 
de um array. O indice e o elemento a ser inserido devem ser passados*/

function inserirMateria(materias, índice, elemento) {
    if ( índice < 0 || índice > materias.length) {
console.log("indice fora dos limites do array.")
return materias 
    }

materias.splice(índice, 0, elemento)

return materias
}

const materias = ['quimica', 'geografia', 'matematica', 'fisica']
const novasMaterias = inserirMateria(materias, 2, 'historia')
console.log(novasMaterias)
