const { CONFIG } = require('./config')
const { PATHS, ERRORS, AUTH_METHODS, ENVIRONMENT } = require('./consts')
const { HttpClient } = require('./http-client')

/**
 * @typedef {Object} Pagination
 * @property {number} page which page will be returned
 * @property {number} perPage how much per page result will be returned
 */

/**
 * @typedef {Object} FormFields
 * @property {string} address
 * @property {number} amount
 */

/**
 * @typedef {Object} Files
 * @property {string} document_front_image
 * @property {string} document_back_image
 */

/**
 * @typedef {Object} UserData
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} date_of_birth
 * @property {string} citizenship
 * @property {string} middle_name
 * @property {string} title
 * @property {string} gender
 * @property {string} phone_number
 * @property {string} document_type
 */

/**
 * @description Celsius function makes all requests to Wallet API.
 * @param {object} config - Config has partner key, auth method and user secret.
 * @constructor
 */
const Celsius = function (config) {
  let defaultConfig = CONFIG[config.environment]
  if (!defaultConfig) {
    defaultConfig = CONFIG[ENVIRONMENT.PRODUCTION]
  }
  config = Object.assign({}, defaultConfig, config)

  if (config.authMethod !== AUTH_METHODS.API_KEY && config.authMethod !== AUTH_METHODS.USER_TOKEN) {
    throw new Error(ERRORS.INVALID_AUTH_METHOD)
  }

  if (!config.partnerKey) {
    throw new Error(ERRORS.INVALID_PARTNER_KEY)
  }

  const httpClient = HttpClient(config)

  return {
    /**
     * This method returns the current KYC status for the given user.
     * If partner authenticates users via api-keys, status returned will always be Passed because users are required to
     * pass KYC before creating api keys.
     *
     * KYC Status | Description
     * :--------- | :----------
     * Pending | Waiting on user to provide documents for verification.
     * Completed | User has provided documents and is waiting to be verified.
     * Passed | User was successfully verified.
     * Rejected | User has failed verification.
     *
     * @returns
     * | name             | argument     | triggering UI event |
     * :--------------- | :----------  | :------------------ |
     * | WIDGETSELECTED   | none         | onClick             |
     * @function getKycStatus
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     */
    getKycStatus: function (userSecret) {
      return httpClient.get(PATHS.KYC, null, userSecret)
    },

    /**
     * This method returns the current balance for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param userData {UserData} Represents an informations about user.
     * @param files {Files} Images from user.
     */
    verifyKyc: function (userData, documents, userSecret) {
      return httpClient.post(PATHS.KYC, userData, documents, userSecret)
    },

    /**
     * This method returns the current balance for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     */
    getBalanceSummary: function (userSecret) {
      return httpClient.get(PATHS.BALANCE_SUMMARY, null, userSecret)
    },

    /**
     * This method returns the current balance for given coin.
     * @returns
     *  amount         | amount_in_usd
     * :--------------- | :----------
     *  12.00000000    | 77916.274569
     *
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param coin {string} Coin for balance.
     *
     */
    getCoinBalance: function (coin, userSecret) {
      return httpClient.get(PATHS.COIN_BALANCE(coin), null, userSecret)
    },

    /**
     * This method returns all transactions for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param pagination {Pagination} Represents a format of response.
     */
    getTransactionSummary: function (pagination, userSecret) {
      return httpClient.get(PATHS.TRANSACTIONS_SUMMARY, pagination, userSecret)
    },

    /**
     * This method returns all transactions for specific coin for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param pagination {Pagination} Represents a format of response.
     * @param coin {string} For witch coin.
     */
    getCoinTransactions: function (coin, pagination, userSecret) {
      return httpClient.get(PATHS.COIN_TRANSACTIONS(coin), pagination, userSecret)
    },

    /**
     * This method do deposit for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param coin {string} For witch coin.
     */
    getDeposit: function (coin, userSecret) {
      return httpClient.get(PATHS.DEPOSIT(coin), null, userSecret)
    },

    /**
     * This method do withdraw for given user.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param coin {string} For witch coin.
     * @param formFields {FormFields} Informations about recipient.
     */
    withdraw: function (coin, formFields, userSecret) {
      return httpClient.post(PATHS.WITHDRAW(coin), formFields, null, userSecret)
    },

    /**
     * This method returns transaction status for specific transaction.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param transaction {string} Id of transaction.
     */
    getTransactionStatus: function (transaction, userSecret) {
      return httpClient.get(PATHS.TRANSACTION_STATUS(transaction), null, userSecret)
    }
  }
}

module.exports = {
  Celsius
}
