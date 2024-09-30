import fs from "node:fs/promises"
import { select, input, confirm } from "@inquirer/prompts"

const file = "contacts.json"

let contacts
let message = "Bem-vindo ao seu gerenciador de contatos!"

const fetchContacts = async () => {
  try {
    const data = await fs.readFile(file, "utf-8")
    contacts = JSON.parse(data)
  } catch (error) {
    contacts = []
  }
}

const saveContacts = async () => {
  await fs.writeFile(file, JSON.stringify(contacts, null, 2))
}

const isValidPhone = (phone, hasDDD) => {
  return hasDDD ? phone.length === 11 : phone.length === 9
}

const addContact = async () => {
  let name, phone, hasDDD

  while (true) {
    if (message) {
      console.log(message)
      message = "" // Limpa a mensagem após exibição
    }

    name = await input({
      message: "Digite o nome do contato: "
    })

    if (name.length === 0) {
      message = "Nome não pode ser vazio! Tente novamente."
      continue
    }

    break // Sai do loop se todos os dados estiverem válidos
  }

  while (true) {
    if (message) {
      console.log(message)
      message = "" // Limpa a mensagem após exibição
    }

    hasDDD = await confirm({
      message: "Este número possui DDD?",
      initial: true
    })

    phone = await input({
      message: "Digite o telefone do contato: "
    })

    if (phone.length === 0) {
      message = "Telefone não pode ser vazio! Tente novamente."
      continue
    }

    if (!isValidPhone(phone, hasDDD)) {
      message = hasDDD
        ? "O telefone com DDD deve ter 11 dígitos (incluindo DDD). Tente novamente."
        : "O telefone sem DDD deve ter 9 dígitos. Tente novamente."
      continue
    }

    break // Sai do loop se todos os dados estiverem válidos
  }

  contacts.push({ name, phone })
  message = "Contato adicionado com sucesso!"
}

const showMessage = () => {
  if (message !== "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const listContacts = () => {
  if (contacts.length === 0) {
    message = "Nenhum contato encontrado."
  } else console.log("Lista de Contatos:")
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name}: ${contact.phone}`)
  })
}

const updateContact = async () => {
  if (contacts.length === 0) {
    console.log("Nenhum contato para atualizar.")
    /* message = "Nenhum contato para atualizar." ////talvez de problema aqui!!!!*/
    return
  }

  const contactName = await input({
    message: "Selecione o contato a ser atualizado:"
  })

  const contactIndex = contacts.findIndex(
    (contact) => contact.naome === contactName
  )
  if (contactIndex === -1) {
    console.log("Contato não encontrado")
    return
  }
  const contact = contacts[contactIndex]

  //Atualiza o nome
  const newName =
    (await input({
      message: `Novo nome do contato ( "${contact.name}" ): `
    })) || contact.name // mantem nome vazio

  //atualiza o telefone
  let phone
  let hasDDD

  while (true) {
    hasDDD = await confirm({ message: "Este numero possui DDD?" })
    phone =
      (await input({
        message: `Novo telefone (ou pressione enter para manter "${contact.phone}"): `
      })) || contact.phone //mantem o telefone atual se vazio

    if (!isValidPhone(phone, hasDDD)) {
      message = hasDDD
        ? "O telefone com DDD deve ter 11 dígitos (incluindo DDD). Tente novamente."
        : "O telefone sem DDD deve ter 9 dígitos. Tente novamente."
      console.log(message)
      continue
    }

    break
  }

  contacts[contactIndex] = { name: newName, phone }
  message = "Contato atualizado com sucesso!"
}

const start = async () => {
  await fetchContacts()

  while (true) {
    showMessage()
    await saveContacts()

    const option = await select({
      message: "Menu > ",
      choices: [
        { name: "Adicionar contato", value: "add" },
        { name: "Lista Telefonica", value: "list" },
        { name: "Atualizar Contato", value: "update" },
        { name: "Sair", value: "exit" }
      ]
    })

    switch (option) {
      case "add":
        await addContact()
        break
      case "list":
        listContacts()
        break
      case "update":
        updateContact()
        break
      case "exit":
        console.log("Até a próxima!")
        return
    }
  }
}

start()
