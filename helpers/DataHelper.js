/* eslint-disable class-methods-use-this */
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

class DataHelper {
  readYamlFile(attribute) {
    const filePath = path.resolve(__dirname, `../resources/data/${process.env.ENV}/credencial.yml`)

    console.log(`Caminho do arquivo YAML: ${filePath}`)

    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')

      const data = yaml.load(fileContents)

      console.log('Dados carregados do arquivo YAML:', data)

      return data[attribute]
    } catch (error) {
      console.error(`Erro ao carregar o arquivo YAML: ${error.message}`)
      throw error
    }
  }

  readUrl(environment) {
    const filePath = path.resolve(__dirname, `../resources/conf/url-${environment}.yml`)

    try {
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { url } = yaml.load(fileContents)
      console.log(`Está acessando a URL do ambiente '${environment}': ${url}`)
      return url
    } catch (error) {
      console.error(`Erro ao carregar o arquivo YAML: ${error.message}`)
      throw error
    }
  }
}

module.exports = new DataHelper()
