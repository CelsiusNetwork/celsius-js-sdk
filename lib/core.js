const { defaultConfig } = require('./config')
const { PATHS, ERRORS, AUTH_METHODS } = require('./consts')
const { HttpClient } = require('./http-client')

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
    getKycStatus: function (userSecret) {
      return httpClient.get(PATHS.KYC, null, userSecret)
    },

    verifyKyc: function (userData, documents, userSecret) {
      return httpClient.post(PATHS.KYC, userData, documents, userSecret)
    },

    getBalanceSummary: function (userSecret) {
      return httpClient.get(PATHS.BALANCE_SUMMARY, null, userSecret)
    },

    getCoinBalance: function (coin, userSecret) {
      return httpClient.get(PATHS.COIN_BALANCE(coin), null, userSecret)
    },

    getTransactionSummary: function (pagination, userSecret) {
      return httpClient.get(PATHS.TRANSACTIONS_SUMMARY, pagination, userSecret)
    },

    getCoinTransactions: function (coin, pagination, userSecret) {
      return httpClient.get(PATHS.COIN_TRANSACTIONS(coin), pagination, userSecret)
    },

    getDeposit: function (coin, userSecret) {
      return httpClient.get(PATHS.DEPOSIT(coin), null, userSecret)
    },

    withdraw: function (coin, formFields, userSecret) {
      return httpClient.post(PATHS.WITHDRAW(coin), formFields, null, userSecret)
    },

    getTransactionStatus: function (transaction, userSecret) {
      return httpClient.get(PATHS.TRANSACTION_STATUS(transaction), null, userSecret)
    }
  }
}

module.exports = {
  Celsius
}
