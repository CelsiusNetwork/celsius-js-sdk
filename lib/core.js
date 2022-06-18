const { CONFIG } = require('./config')
const { PATHS, AUTH_METHODS, ENVIRONMENT } = require('./consts')
const { HttpClient } = require('./http-client')
const { ERROR_MESSAGES, CelsiusSDKError } = require('./errors')

/**
 * @typedef {string} KYCStatus
 * @description KYC Status | Description
 * :--------- | :----------
 * Pending | Waiting on user to provide documents for verification
 * Completed | User has provided documents and is waiting to be verified
 * Passed | User was successfully verified
 * Rejected | User has failed verification
 */
/**
 * @typedef {object} KYCStatusResponse
 * @param status {string}
 * @param reasons {array}
 */

/**
 * @typedef {object} StartKYCVerificationResponse
 * @param message {string}
 */

/**
 * @typedef {object} BalanceResponse
 * @description Contains balances for all supported coins.
 */

/**
 * @typedef {object} WithdrawalAddressesResponse
 * @description Contains withdrawal addresses for coins.
 */

/**
 * @typedef {object} InterestResponse
 * @description Contains interest earned so far for all supported coins and total interest earned in usd.
 */

/**
 * @typedef {object} StatisticsResponse
 * @description Contains statistical data about users.
 * @property {string | number} depositCount - Contains number of deposits made by the user
 * @property {Object} depositAmount - Contains total amount deposited per coin as well as total amount deposited in usd
 * @property {string | number} withdrawalCount - Contains number of withdrawals made by the user
 * @property {Object} withdrawalAmount - Contains total amount withdrawn per coin as well as total amount withdrawn in usd
 * @property {string | number} interestCount - Contains number of interests earned by the user
 * @property {Object} interestAmount - Contains total amount earned per coin as well as total amount earned in usd
 */

/**
 * @typedef {object} SupportedCountriesResponse
 * @description Contains the array of countries Celsius supports
 *
 * @property {array} countries - List of supported countries
 */

/**
 * @typedef {object} UpdateToUResponse
 * @description Returns whether or not the ToU were accepted successfully.
 * @property {boolean} success
 */

/**
 * @typedef {object} GetToUResponse
 * @description Returns the latest Tou. Additionally, it will return "confirmation_date" if user accepted ToU.
 * @property {string} - Contains ToU id
 * @property {string} - Contains ToU document
 * @property {string} - Contains confirmation date
 */

/**
 * @typedef {Object} Pagination
 * @property {number} page - Which page will be returned
 * @property {number} perPage - Number of results to be returned per page
 */

/**
 * @typedef {Object} FormFields
 * @property {string} address - Address where funds need to be sent
 * @property {number} amount
 */

/**
 * @typedef {Object} Documents
 * @property {string} document_front_image
 * @property {string} document_back_image
 */

/**
 * @typedef {Object} UserData
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} date_of_birth
 * @property {string} citizenship
 * @property {string} country
 * @property {string} state
 * @property {string} city
 * @property {string} zip
 * @property {string} street
 * @property {string} building_number
 * @property {string} flat_number
 * @property {string} itin
 * @property {string} national_id
 * @property {string} ssn
 * @property {string} middle_name
 * @property {string} title
 * @property {string} gender
 * @property {string} phone_number
 * @property {string} document_type
 */

/**
 * @typedef {object} CelsiusInstance
 * @property {function} getKycStatus - Method for sending GET requests
 * @property {function} verifyKyc - Method for sending POST requests. Data is transmitted using multipart/form-data
 */

/**
 * @typedef {Object} EchoResponse
 * @property {string} originalMessage
 */

/**
 * Celsius js SDK Core
 * @module celsius-js-sdk/core
 */
/**
 * @description Creates and configures Core.
 *
 * @function
 * @param {object} config - Config has partner key, auth method and user secret.
 *
 * @returns {Promise<CelsiusInstance>}
 */
const Celsius = function (config) {
  let defaultConfig = CONFIG[config.environment]
  if (!defaultConfig) {
    defaultConfig = CONFIG[ENVIRONMENT.PRODUCTION]
  }
  config = Object.assign({}, defaultConfig, config)

  if (config.authMethod !== AUTH_METHODS.API_KEY && config.authMethod !== AUTH_METHODS.USER_TOKEN) {
    throw new CelsiusSDKError(ERROR_MESSAGES.INVALID_AUTH_METHOD)
  }

  if (!config.partnerKey) {
    throw new CelsiusSDKError(ERROR_MESSAGES.INVALID_PARTNER_KEY)
  }

  const httpClient = HttpClient(config)

  const CelsiusInstance = {
    /**
     * Contains supported currencies. To refresh, call getSupportedCurrencies method.
     * @memberOf module:celsius-js-sdk/core
     * @member {String[]} currencies
     *
     */
    currencies: null,

    /**
     * Returns KYC status for the given user.
     * If partner authenticates users via api-keys, status returned will always be Passed because users are required to
     * pass KYC before creating api keys.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getKycStatus
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     *
     * @returns {KYCStatus | Error}
     *
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     */
    getKycStatus: function (userSecret) {
      return httpClient.get(PATHS.KYC, null, userSecret)
    },

    /**
     * Returns current balance for the given user.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function verifyKyc
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param userData {UserData} - Represents user's personal information.
     * @param documents {Documents} - Images of user's documents.
     *
     * @returns {Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     * Kyc passed | KYC already passed
     * Kyc started | You already sent KYC request
     * Kyc data missing | Missing some of the data required for KYC
     * Invalid country provided | Country provided wasn't found in our supported countries
     * Invalid state provided | State provided wasn't found in our supported US states
     * Badly formatted SSN provided | SSN provided was in a wrong format
     * Invalid SSN error | SSN provided has failed verification
     */
    verifyKyc: function (userData, documents, userSecret) {
      return httpClient.post(PATHS.KYC, userData, documents, userSecret)
    },

    /**
     * Returns currently supported currencies and refreshes currencies property of this CelsiusInstance.
     * If userSecret is passed, it returns residence-compliant currencies for a given user
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getSupportedCurrencies
     * @param [userSecret] {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     *
     * @returns {String[]}
     */
    getSupportedCurrencies: function (userSecret) {
      return httpClient.get(PATHS.SUPPORTED_CURRENCIES, null, userSecret || '').then((currencies) => {
        this.currencies = currencies.currencies
        return currencies
      })
    },

    /**
     * Returns balance for the given user.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getBalanceSummary
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @returns {BalanceResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     */
    getBalanceSummary: function (userSecret) {
      return httpClient.get(PATHS.BALANCE_SUMMARY, null, userSecret)
    },

    /**
     * Returns balance of a single coin for the given user.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getCoinBalance
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param coin {string} - Coin for which to get balance.
     *
     * @returns {BalanceForCoinResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     * Coin not supported | Coin requested isn't yet supported by us
     */
    getCoinBalance: function (coin, userSecret) {
      return httpClient.get(PATHS.COIN_BALANCE(coin), null, userSecret)
    },

    /**
     * Returns interest earned so far for the given user.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getInterestSummary
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @returns {InterestResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     */
    getInterestSummary: function (userSecret) {
      return httpClient.get(PATHS.INTEREST_SUMMARY, null, userSecret)
    },

    /**
     * Returns paginated transactions of a user.
     * Also included in the response is a {PaginationHeader}, used to get next chunk of transactions.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getTransactionSummary
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param pagination {PaginationConfig} - Pagination configuration (Which page to get and how many results per page).
     *
     * @returns {TransactionResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     */
    getTransactionSummary: function (pagination, userSecret) {
      return httpClient.get(PATHS.TRANSACTIONS_SUMMARY, pagination, userSecret)
    },

    /**
     * Returns paginated transactions of a user for the specified coin.
     * Also included in the response is a {PaginationHeader}, used to get next chunk of transactions.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getCoinTransactions
     * @param userSecret {string} -  Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param pagination {PaginationConfig} - Pagination configuration (Which page to get and how many results per page).
     * @param coin {string} - Coin for which to get transactions.
     *
     * @returns {TransactionResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     * Coin not supported | Coin requested isn't yet supported by us
     */
    getCoinTransactions: function (coin, pagination, userSecret) {
      return httpClient.get(PATHS.COIN_TRANSACTIONS(coin), pagination, userSecret)
    },

    /**
     * Returns deposit address of a user's wallet for the specified coin.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getDeposit
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param coin {string} Coin for which to get deposit address.
     *
     * @returns {Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     * Coin not supported | Coin requested isn't yet supported by us
     * KYC not passed | You have to pass KYC to perform this action
     */
    getDeposit: function (coin, userSecret) {
      return httpClient.get(PATHS.DEPOSIT(coin), null, userSecret)
    },

    /**
     * Withdraws the specified amount to the provided address.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function withdraw
     * @param coin {string} - For witch coin to perform the withdrawal.
     * @param formFields {WithdrawalFields} - Contains amount to withdraw and and address that amount is to be withdrawn to.
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     *
     * @returns {Error}
     * Error name | Description
     * :--------------- | :----------
     * Unauthorized | Required user secret and partner key and permission
     * Invalid response | Signature failed verification
     * Invalid partner| Non existent partner
     * Coin not supported | Coin requested isn't yet supported by us
     * KYC not passed | You have to pass KYC to perform this action
     * Bad address format | Bad address format
     * Dusk check | You cannot withdraw less than 1$
     * Duplicate withdraw request | You have pending request with the same amount and outgoing address. Please make sure that the first transaction is confirmed before continuing
     * Insufficient funds | Insufficient funds.
     * Withdrawal limits hit | Withdrawal limits hit
     * Daily withdrawal limits hit | Daily withdrawal limits hit
     */
    withdraw: function (coin, formFields, userSecret) {
      return httpClient.post(PATHS.WITHDRAW(coin), formFields, null, userSecret)
    },

    /**
     * Returns withdrawal address for the given coin.
     * This method is usable only if you are using `originating` withdrawal scheme.
     * An error is return if any other scheme is being used.
     *
     * @param coin {string} - Coin for which to find withdrawal address
     * @param userSecret {string} - Represents a secret value used to uniquely identify users.
     *
     * @returns { { address: string } | Error}
     * Error name | Description
     * :--------------- | :----------
     * Invalid Action For Withdrawal Scheme | You have attempted to obtain withdrawal address but aren't using `originating` withdrawal scheme
     */
    getWithdrawalAddressForCoin: function (coin, userSecret) {
      return httpClient.get(PATHS.WITHDRAWAL_ADDRESS_FOR_COIN(coin), null, userSecret)
    },

    /**
     * Returns withdrawal addresses for all coins.
     * This method is usable only if you are using `originating` withdrawal scheme.
     * An error is return if any other scheme is being used.
     *
     * @param userSecret {string} - Represents a secret value used to uniquely identify users.
     *
     * @returns { WithdrawalAddressesResponse | Error}
     * Error name | Description
     * :--------------- | :----------
     * Invalid Action For Withdrawal Scheme | You have attempted to obtain withdrawal address but aren't using `originating` withdrawal scheme
     */
    getWithdrawalAddresses: function (userSecret) {
      return httpClient.get(PATHS.WITHDRAWAL_ADDRESSES, null, userSecret)
    },

    /**
     * This method returns transaction status for specific transaction.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getTransactionsStatus
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     * @param transaction {string} Id of transaction.
     *
     * @returns {TransactionStatus} Transaction status
     * @returns {Error}
     */
    getTransactionStatus: function (transaction, userSecret) {
      return httpClient.get(PATHS.TRANSACTION_STATUS(transaction), null, userSecret)
    },

    getInterestRates: function () {
      return httpClient.get(PATHS.INTEREST_RATES, null, null, null)
    },

    /**
     * This method returns statistics for the given userSecret.
     * Timestamp can be optionally passed to configure start date for getting statistics.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getStatistics
     * @param timestamp {timestamp} Timestamp from which to calculate statistics
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     *
     * @returns { StatisticsResponse }
     */
    getStatistics: function (userSecret, timestamp = null) {
      return httpClient.get(PATHS.STATISTICS, { timestamp }, userSecret)
    },
    /**
     * Checks API health.
     * @memberOf module:celsius-js-sdk/core
     * @function health
     * @param message {string}
     * @returns { EchoResponse }
     */
    health: function (message) {
      return httpClient.get(PATHS.HEALTH(message), null, null)
    },
    /**
     * This method confirms if the given ToU have been accepted.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function confirmTermsOfUse
     * @param termsOfUseId {string} Id of the ToU document to confirm
     * @param confirmationDate {Date} Confirmation date
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     *
     * @returns { UpdateToUResponse }
     */
    confirmTermsOfUse: function (termsOfUseId, confirmationDate, userSecret) {
      return httpClient.put(PATHS.TERMS_OF_USE, { confirmation_date: confirmationDate, terms_of_use_id: termsOfUseId }, null, userSecret)
    },
    /**
     * This method gets the latest Terms of use. If User Token is provided and user is found and accepted the latest ToU it will return additional "confirmation_date" field in response.
     *
     * @memberOf module:celsius-js-sdk/core
     * @function getTermsOfUse
     * @param userSecret {string} Represents a secret value used to uniquely identify users. Can be user-token or api-key.
     *
     * @returns { GetToUResponse }
     */
    getTermsOfUse: function (userSecret) {
      return httpClient.get(PATHS.TERMS_OF_USE, null, userSecret, { userSecretOptional: !userSecret })
    },
    /**
     * Returns the list of supported countries
     * @memberOf module:celsius-js-sdk/core
     * @function getSupportedCountries
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     * @returns { SupportedCountriesResponse }
     */
    getSupportedCountries: function (userSecret) {
      return httpClient.get(PATHS.SUPPORTED_COUNTRIES, null, userSecret)
    },

    /**
     * Start KYC verification
     * @memberOf module:celsius-js-sdk/core
     * @function startKycVerification
     * @param userId {string}
     * @param documentType {string}
     * @param userDocuments {object}
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     * @returns {StartKYCVerificationResponse}
     */
    startKycVerification: function (userId, documentType, userDocuments, userSecret) {
      return httpClient.post(PATHS.KYC_VERIFICATION(userId), documentType, userDocuments, userSecret)
    },
    /**
     * Returns the status of KYC for a user.
     * @memberOf module:celsius-js-sdk/core
     * @function getKycVerificationStatus
     * @param userId {string} Id of the user for which you wish to get KYC status
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     * @returns { KYCStatusResponse }
     */
    getKycVerificationStatus: function (userId, userSecret) {
      return httpClient.get(PATHS.KYC_VERIFICATION(userId), null, userSecret)
    },
    /**
     * Creates a new user.
     * @memberOf module:celsius-js-sdk/core
     * @function createUser
     * @param user {CreateUser}  Data required for creating a user
     * @returns {CreateUserResponse}
     */
    createUser: function (user) {
      return httpClient.post(PATHS.USERS, user, null, null)
    },
    /**
     * Update user.
     * @memberOf module:celsius-js-sdk/core
     * @function updateUser
     * @param userId {string}
     * @param user {UpdateUser} Data required for updating a user
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     * @returns {UpdateUserResponse}
     */
    updateUser: function (userId, user, userSecret) {
      return httpClient.put(PATHS.UPDATE_USER(userId), user, null, userSecret)
    },
    /**
     * Update user's email.
     * @memberOf module:celsius-js-sdk/core
     * @function updateUserEmail
     * @param email {UpdateEmail} New email address
     * @param userSecret {string} - Represents a secret value used to uniquely identify users. Can be user-token or api-key
     * @returns {UpdateUserResponse}
     */
    updateUserEmail: function (email, userSecret) {
      return httpClient.put(PATHS.USERS, email, null, userSecret)
    }
  }

  return CelsiusInstance.getSupportedCurrencies().then(() => {
    return CelsiusInstance
  })
}

module.exports = {
  Celsius
}
