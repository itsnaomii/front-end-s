//implemente uma classe chamada "ContaBancaria" que possua atributos para armazenar
// o numero da conta, nome do titular e saldo. adicione metodos para realizar depositos e saques.

class ContaBancaria {
  constructor(numeroDaConta, titular) {
    this.numeroDaConta = numeroDaConta
    this.titular = titular // armazena os dados da conta
    this.saldo = 0
  }
  depositar(valor) {
    if (valor > 0) {
      this.saldo += valor

      console.log(
        `Deposito de RS ${valor.toFixed(
          2
        )} realizado. novo saldo: RS ${this.saldo.toFixed(2)} `
      )
    } else {
      console.log("O valor do deposito deve ser positivo.")
    }
  }
  sacar(valor) {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor
      console.log(`Saque de R$ ${valor.toFixed(2)} `)
    } else {
      console.log("O valor do saque deve ser positivo.")
    }
  }
  exibirSaldo() {
    console.log(
      `Saldo da conta ${this.numeroDaConta} - Titular: ${
        this.titular
      }: R$ ${this.saldo.toFixed(2)}`
    )
  }
}

const minhaConta = new ContaBancaria("12345", "Naomi")
minhaConta.depositar(100)
minhaConta.sacar(60)
minhaConta.exibirSaldo()
