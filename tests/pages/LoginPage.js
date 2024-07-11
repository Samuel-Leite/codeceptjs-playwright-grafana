/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
const { I, dataHelper } = inject()

class LoginPage {
  constructor() {
    this.txtEmail = 'email'
    this.txtPassword = 'senha'
    this.btnEntrar = 'Entrar'
    this.alertSuccess = '.alert.alert-success'
    this.alertError = '.alert.alert-danger'
  }

  doLogin(email, password) {
    this.visit()
    this.fillCredentials(email, password)
  }

  visit() {
    const url = dataHelper.readUrl(process.env.ENV)

    I.amOnPage(url)
    I.see('Seu Barriga')
  }

  fillCredentials(email, password) {
    I.fillField(this.txtEmail, email)
    I.fillField(this.txtPassword, password)
    I.click(this.btnEntrar)
  }

  checkLoginStatus(expectedStatus) {
    if (expectedStatus === 'Bem vindo, Seu Madruga!') {
      I.seeElement(this.alertSuccess)
    } else if (expectedStatus === 'Problemas com o login do usuário') {
      I.seeElement(this.alertError)
    } else {
      throw new Error(`Erro: Status '${expectedStatus}' esperado inválido.`)
    }
  }
}

module.exports = new LoginPage()
