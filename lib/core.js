const { defaultConfig } = require('./config')
const { PATHS, ERRORS, AUTH_METHODS } = require('./consts')
const { HttpClient } = require('./http-client')
const { querystring } = require('querystring')

/**
 * @description Celsius function makes all requests to Wallet API.
 * @param {object} config - Config has partner key, auth method and user secret.
 * @constructor
 */
const Celsius = function (config) {
  config = Object.assign(defaultConfig, config)

  if (config.authMethod !== AUTH_METHODS.API_KEY && config.authMethod !== AUTH_METHODS.USER_TOKEN) {
    throw new Error(ERRORS.INVALID_AUTH_METHOD)
  }

  if (!config.partnerKey) {
    throw new Error(ERRORS.INVALID_PARTNER_KEY)
  }

  const httpClient = HttpClient(config)

  return {
    getKycStatus: function () {
      return httpClient.get(PATHS.KYC)
    },

    verifyKyc: function (userData, documents) {
      return httpClient.post(PATHS.KYC, userData, documents)
    },

    getBalanceSummary: function () {
      return httpClient.get(PATHS.BALANCE_SUMMARY)
    },

    getCoinBalance: function (coin) {
      return httpClient.get(PATHS.COIN_BALANCE(coin))
    },

    getTransacionSummary: function (pagination) {
      const queryParams = querystring.stringify({
        page: pagination.page,
        per_page: pagination.perPage
      })
      const url = [PATHS.TRANSACTIONS_SUMMARY, queryParams].join('?')

      return httpClient.get(url)
    },

    getCoinTransactions: function (coin, pagination) {
      const queryParams = querystring.stringify({
        page: pagination.page,
        per_page: pagination.perPage
      })
      const url = [PATHS.COIN_TRANSACTIONS(coin), queryParams].join('?')

      return httpClient.get(url)
    },

    getDeposit: function (coin) {
      return httpClient.get(PATHS.DEPOSIT(coin))
    },

    withdraw: function (coin, formFields) {
      return httpClient.post(PATHS.WITHDRAW(coin), formFields)
    },

    getTransactionStatus: function (transaction) {
      return httpClient.get(PATHS.TRANSACTION_STATUS(transaction))
    }
  }
}

module.exports = {
  Celsius
}
