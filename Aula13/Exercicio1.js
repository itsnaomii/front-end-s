//crie uma classe chamada "circuito" que possua um atribuito para armazenar o raio 
// e metodos para calcular a area e o perimetro do circuito

class Circuito {
    constructor(raio) {
        this.raio = raio  // armazena o raio passado como argumento 
    }
  //para calcular a area do curcuito 
  calcularArea() {
    return Math.PI * Math.pow(this.raio, 2)
  }   

  //para caulcular o perimetro do circuito
  calcularPerimetro() {
    return 2 * Math.PI * this.raio 
  }
}

const meuCircuito = new Circuito(5)
console.log("Area do circuito:", meuCircuito.calcularArea()) //calcula e exibe a area
console.log("Perimetro do circuito:", meuCircuito.calcularPerimetro()) //calcula e exibe o perimetro