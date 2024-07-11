/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
const Helper = require('@codeceptjs/helper')
const fs = require('fs').promises
const path = require('path')
// const { exec } = require('child_process')

class Hooks extends Helper {
  async _init() {
    // before all tests
    console.log('*************************************')
    console.log('** 💻⚙️  Variáveis de Ambiente 💻⚙️  **')
    console.log(`BROWSER: ${process.env.BROWSER}`)
    console.log(`ENV: ${process.env.ENV}`)
    // Verifica se estamos dentro de um contêiner Docker
    const isDocker = process.env.DOCKER === 'true'

    // Exclua o diretório output localmente
    if (!isDocker) {
      try {
        await fs.rm(path.resolve(__dirname, '../output'), { recursive: true })
        console.log('DIRETORIO LOCAL: excluído com sucesso!')
      } catch (error) {
        console.error('DIRETORIO LOCAL: Ocorreu um erro:', error)
      }
    }

    // Exclua o diretório output dentro do contêiner
    if (isDocker) {
      try {
        const containerOutputDir = '/usr/src/app/output'
        const files = await fs.readdir(containerOutputDir)
        files.forEach(async (file) => {
          const filePath = path.join(containerOutputDir, file)
          await fs.rm(filePath, { recursive: true, force: true })
        })
        console.log('DIRETORIO DOCKER: limpo com sucesso!')
      } catch (error) {
        console.error('DIRETORIO DOCKER: Ocorreu um erro:', error)
      }
    }
  }

  _before() {
    console.log('🚀--------------- Iniciando a jornada dos testes -----------✈️')
  }

  _after() {
    console.log('🎉------------------ Testes concluídos! --------------------🏁')
  }

  _beforeStep(step) {
    console.log(`🚦 Preparando para executar o step: ${step.name}`)
    this.stepStartTime = Date.now()
  }

  _afterStep(step) {
    // Após cada step
    const stepEndTime = Date.now()
    const stepExecutionTime = stepEndTime - this.stepStartTime
    console.log(`✅ Step "${step.name}" concluído em: ${stepExecutionTime}ms`)

    // Exemplo de captura de tempo de carregamento de página
    if (step.name === 'amOnPage') {
      const pageLoadTime = stepExecutionTime
      console.log(`🌐 Tempo de carregamento da página: ${pageLoadTime}ms`)
      // Envie para o InfluxDB ou outro serviço
    }
  }

  _beforeSuite() {
    console.log('📂 Preparando para iniciar uma nova suite de testes...')
    this.suiteStartTime = Date.now()
  }

  _afterSuite() {
    console.log('🏁 Suite de testes concluída com sucesso!')
    const suiteEndTime = Date.now()
    const suiteExecutionTime = suiteEndTime - this.suiteStartTime
    console.log(`ℹ️ Tempo total da suite: ${suiteExecutionTime}ms`)
  }

  _passed() {
    console.log('✅ Cenário de teste concluído com sucesso!')
  }

  _failed() {
    console.log('❌ Teste falhou! Verifique o log para mais detalhes.')
  }

  // _finishTest() {
  //   // Caminho para o arquivo de relatório HTML do Mochawesome
  //   const reportPath = path.join(__dirname, '../output/report.html')

  //   // Determinar o comando apropriado para abrir o relatório no Windows
  //   const openCommand = process.platform === 'win32' ? `start "" "${reportPath}"` : `open "${reportPath}"`

  //   // Executar o comando para abrir o relatório
  //   exec(openCommand, (err) => {
  //     if (err) {
  //       console.error('Erro ao abrir o relatório:', err)
  //     } else {
  //       console.log('Relatório de teste gerado e aberto com sucesso!')
  //     }
  //   })
  // }
}

module.exports = Hooks
