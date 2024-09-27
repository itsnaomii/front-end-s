import fs from "node:fs/promises"
import { select, input, checkbox } from "@inquirer/prompts"
/*import chalk from "chalk"*/

const file = "goals.json"

let goals

let message = "Bem vindo ao seu controle de metas!"

const fetchGoals = async () => {
  try {
    const data = await fs.readFile(file, "utf-8") //leitura do arquivo
    goals = JSON.parse(data)
  } catch (error) {
    goals = []
  }
}

const saveGoals = async () => {
  await fs.writeFile(file, JSON.stringify(goals, null, 2))
}

const registerGoal = async () => {
  const goal = await input({
    message: "Digite a sua meta: "
  })

  if (goal.length == 0) {
    message = "A meta não pode ser vazia!"
    return
  }

  goals.push({ value: goal, checked: false })

  message = "Meta cadastrada com sucesso!"
}

const listGoals = async () => {
  if (goals.length == 0) {
    message = "Não existem metas cadastradas!"
    return
  }

  // armazena as mmetas marcadas como concluidas
  const checkedGoals = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar/desmarcar a meta e o enter para finalizar.",
    choices: [...goals],
    instructions: false //remover as instruções em ingles
  })

  //garantir que as metas iniciem como desmarcadas
  goals.forEach((goal) => {
    goal.checked = false
  })

  if (checkedGoals == 0) {
    message = "Nenhuma meta foi selecionada"
    return
  }

  //para cada meta selecionada, marca como concluida
  checkedGoals.forEach((checkedGoal) => {
    const goal = goals.find((selectedGoal) => {
      return selectedGoal.value == checkedGoal
    })

    goal.checked = true
  })

  message = "Meta(s) marcada(s) como concluida(s)!"
}

const listCompletedGoals = async () => {
  const completedGoals = goals.filter((goal) => {
    return goal.checked
  })

  if (completedGoals.length == 0) {
    message = "Não existem metas concluidas."
    return
  }

  completedGoals.forEach((completedGoal) => {
    console.log(completedGoal.value)
  })
}

const listIncompletedGoals = async () => {
  const incompletedGoals = goals.filter((goal) => {
    return !goal.checked
  })

  if (incompletedGoals.length == 0) {
    message = "Todas as metas foram concluidas!"
    return
  }

  incompletedGoals.forEach((incompletedGoal) => {
    console.log(incompletedGoal.value)
  })
}

const deleteGoals = async () => {
  //informa o usuario caso não existam metas cadastradas
  if (goals.length == 0) {
    message = "Não existem metas cadastradas!"
    return
  }

  //cada meta é transformada em um objeto
  const uncheckedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  //exibir o checkbox permitindo que as metas sejam selecionadas
  const goalsToDelete = await checkbox({
    message: "Selecione as metas que deseja deletar:",
    choices: [...uncheckedGoals],
    instructions: false
  })

  //se nenhuma meta for selecionada, informa ao usuario
  if (goalsToDelete.length == 0) {
    message = "Nenhuma meta foi selecionada!"
    return
  }

  //filtra o array e cria um novo array com as metas não marcadas
  goalsToDelete.forEach((item) => {
    goals = goals.filter((goal) => {
      console.log(`Diferente: ${goal.value != item}`)
      return goal.value != item
    })
  })

  message = "Meta(s) deletada(s) com sucesso!"
}

const updateGoals = async () => {
  if (goals.length == 0) {
    message = "Não existem metas cadastradas!"
    return
  }

  const uncheckedGoals = goals.map((goal) => {
    return { value: goal.value, checked: false }
  })

  const goalsToUpdate = await checkbox({
    message: "Selecione a(s) meta(s) que deseja atualizar: ",
    choices: [...uncheckedGoals],
    instructions: false
  })

  if (goalsToUpdate.length == 0) {
    message = "Nenhuma meta foi selecionada!"
    return
  }

  for (const oldGoal of goalsToUpdate) {
    //solicitar o novo nome para a meta selecionada
    const newGoal = await input({
      message: `Digite o novo nome para a meta ${oldGoal}: `
    })

    if (newGoal.length == 0) {
      message = "O novo nome da meta não pode ser vazio!"
      return
    }

    const goalIndex = goals.findIndex((goal) => goal.value === oldGoal)

    if (goalIndex !== -1) {
      goals[goalIndex].value = newGoal
    }
  }

  message = "Meta(s) atualizada(s) com sucesso!"
}

const showMessage = () => {
  console.clear()

  if (message != "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const start = async () => {
  await fetchGoals()

  while (true) {
    showMessage()
    await saveGoals()

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
          name: "Listar meta(s) realizada(s)",
          value: "completed"
        },
        {
          name: " Listar meta(s) não realizada(s)",
          value: "incompleted"
        },
        {
          name: "Atualizar meta(s)",
          value: "update"
        },
        {
          name: "Deletar meta(s)",
          value: "Delete"
        },
        {
          name: "Sair",
          value: "out"
        }
      ]
    })

    switch (option) {
      case "register":
        await registerGoal()
        console.log(goals)
        break
      case "list":
        await listGoals()
        break
      case "completed":
        await listCompletedGoals()
        break
      case "incompleted":
        await listIncompletedGoals()
        break
      case "update":
        await updateGoals()
        break
      case "delete":
        await deleteGoals()
        break
      case "out":
        console.log("Até a proxima!!")
        return

      /*case "register":
        console.log(chalk.blue("Vamos cadastrar uma meta!"))
        break
      case "list":
        console.log(chalk.blue("Vamos listar sua(s) meta(s)"))
        break
      case "out":
        console.log(chalk.blue("Até a proxima!"))
        return*/
    }
  }
}

start()
