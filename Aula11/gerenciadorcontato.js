import fs from "node:fs/promises"
import { select, input, confirm } from "@inquirer/prompts"

const file = "contacts.json" //nome do arquivo onde os contatos são armazenados

let contacts //armazena os contatos
let message = "Bem-vindo ao seu gerenciador de contatos!"

//função fetchContacts
const fetchContacts = async () => {
  try {
    //le os contatos do arquivo json e os armazena na variavel contacts
    const data = await fs.readFile(file, "utf-8") // se não conseguir ler ele aparece como um array vazio
    contacts = JSON.parse(data)
  } catch (error) {
    contacts = []
  }
}

//função saveContacts
const saveContacts = async () => {
  //salva a lista de contatos no arquivo json
  await fs.writeFile(file, JSON.stringify(contacts, null, 2))
}

//função isValidPhone
const isValidPhone = (phone, hasDDD) => {
  //explicativo aqui relação a presença do DDD na hora de inserir o numero
  return hasDDD ? phone.length === 11 : phone.length === 9
}

//função addContact                 //interage com o usuario p\ add um novo contato
const addContact = async () => {
  //pergunta se o numero possui DDD e valida o telefone
  let name, phone, hasDDD //adiciona o novo contato ao array contacts

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
  //vai exibir a mensagem armazenada na variavel message se houver
  if (message !== "") {
    console.log(message)
    console.log("")
    message = ""
  }
}

const listContacts = () => {
  //lista os contatos armazenados e se não tiver
  if (contacts.length === 0) {
    // ele infroma que nenhum foi encontrado
    message = "Nenhum contato encontrado."
  } else console.log("Lista de Contatos:")
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. ${contact.name}: ${contact.phone}`)
  })
}

const updateContact = async () => {
  // para atualizar um contato existente
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
  //função principal que inicia o gerenciador
  await fetchContacts() //chama fetchContacts para carregar contatos do arquivo
  //mostra o menu com as opções adicionar,listar,atualizar,sair etc
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

start() //incia a aplicação chamando a função start
