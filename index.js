const { select } = require("@inquirer/prompts")

const goal = {
  value: "Tomar 3L de água por dia",
  checked: false
}

const goals = [goal]

const registerGoal = async () => {
  const goal = await input({
    message: "Digite a sua meta: "
  })

  if (goal.length === 0) {
    console.log("A meta não pode ser vazia!")
    return
  }

  goals.push({ value: goal, checked: false })
}

const start = async () => {
  while (true) {
    const option = await select({
      message: "Menu > ",
      choices: [
        {
          name: "Cadastrar meta",
          value: "register"
        },
        {
          name: "Listar meta(s)",
          value: "list"
        },
        {
          name: "Sair",
          value: "out"
        }
      ]
    })

    switch (option) {
      case "register":
        console.log("Vamos cadastrar uma meta!")
        break
      case "list":
        console.log("Vamos listar sua(s) meta(s)")
      case "out":
        console.log("Até a proxima!")
        return
    }
  }
}

start()
