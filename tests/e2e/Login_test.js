/* eslint-disable no-undef */
Feature('Acesso a plataforma Seu Barriga')

Scenario('Login com credenciais validas', ({ loginPage, dataHelper }) => {
  const credencial = dataHelper.readYamlFile('valida')
  loginPage.doLogin(credencial.email, credencial.senha)
  loginPage.checkLoginStatus('Bem vindo, Seu Madruga!')
}).tag('wip')

Scenario('Login com credenciais invalidas', ({ loginPage, dataHelper }) => {
  const credencial = dataHelper.readYamlFile('invalida')
  loginPage.doLogin(credencial.email, credencial.senha)
  loginPage.checkLoginStatus('Problemas com o login do usuário')
})
