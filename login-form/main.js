const form = document.getElementById("loginForm")

form.addEventListener("submit", function (event) {
  event.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const errorMailElement = document.querySelector(".mail-error")
  const errorPasswordElement = document.querySelector(".password-error")

  const errorMailMessage = document.createElement("pre")
  const errorPasswordMessage = document.createElement("pre")

  errorMailElement.innerHTML = ""
  errorSenhaElement.innerHTML = ""

  let valid = true

  if (!validatedEmail(email)) {
    valid = false
    errorMailMessage.textContent = "Por favor, insira um e-mail válido!"
    errorMailElement.appendChild(errorMailMessage)
  }

  if (password.length < 6) {
    valid = false
    errorPasswordMessage.textContent =
      "A senha deve ter pelo menos 6 caracteres."
    errorPasswordElement.appendChild(errorPasswordMessage)
  }

  const loggedUser = localStorage.getItem("login-form")

  if (loggedUser) {
    alert("Você já está logado!")
  } else {
    localStorage.setItem("login-form", "loggedUser")

    alert("Formulário enviado com sucesso!")
  }

  /*   if (valid) {
    alert("Formulário enviado com sucesso!");
    localStorage.setItem("login-form", "loggedUser");
  } */
})

function validatedEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/*function tooglePassword() {
  document
    .querySelectorAll(".eye")
    .forEach((eye) => eye.classList.toggle("hide"));*/

const customType =
  password.getAttribute("type") == "password" ? "text" : "password"

password.setAttribute("type", customType)

console.log(customType)
//}
