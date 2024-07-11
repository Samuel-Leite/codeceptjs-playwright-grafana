/** @type {CodeceptJS.MainConfig} */
require('dotenv').config({ path: '.env' })
const path = require('path')

exports.config = {
  tests: './tests/e2e/Login_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: process.env.BROWSER,
      url: '',
      show: true,
    },
    Hooks: {
      require: './helpers/Hooks.js',
    },
  },
  include: {
    I: './helpers/Commands.js',
    loginPage: './tests/pages/LoginPage.js',
    dataHelper: path.resolve('./helpers/DataHelper'),
  },
  plugins: {
    stepByStepReport: {
      enabled: true,
      ignoreSteps: ['grab*'],
      output: './output',
      deleteSuccessful: false,
      disableScreenshotOnFail: false,
    },
    // Habilitar o ultimo print em caso de falha
    screenshotOnFail: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
  },
  name: 'web-grafana-codeceptjs-playwright',
}
