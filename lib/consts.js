/**
 * @description Environment names.
 * @type {{STAGING: string, PRODUCTION: string}}
 * @constant
 */
const ENVIRONMENT = {
  STAGING: 'staging',
  PRODUCTION: 'production'
}

/**
 * @description Kind of authentication.
 * @type {{API_KEY: string, USER_TOKEN: string}}
 * @constant
 */
const AUTH_METHODS = {
  API_KEY: 'api-key',
  USER_TOKEN: 'user-token'
}

/**
 * @description Paths to the Wallet API.
 * @type {{KYC: string, SUPPORTED_CURRENCIES: string, SUPPORTED_COUNTRIES: string, BALANCE_SUMMARY: string, TRANSACTIONS_SUMMARY: string, TERMS_OF_USE: string, COIN_BALANCE: (function(*): string), COIN_TRANSACTIONS: (function(*): string), DEPOSIT: (function(*): string), WITHDRAW: (function(*): string), TRANSACTION_STATUS: (function(*): string), HEALTH: (function(*): string), KYC_VERIFICATION: (function(*): string)}}
 * @constant
 */
const PATHS = {
  KYC: '/kyc',
  SUPPORTED_CURRENCIES: '/util/supported_currencies',
  SUPPORTED_COUNTRIES: '/util/countries',
  BALANCE_SUMMARY: '/wallet/balance',
  INTEREST_SUMMARY: '/wallet/interest',
  TRANSACTIONS_SUMMARY: '/wallet/transactions',
  INTEREST_RATES: '/util/interest/rates',
  COIN_BALANCE: (coin) => {
    return '/wallet/' + coin + '/balance'
  },
  COIN_TRANSACTIONS: (coin) => {
    return '/wallet/' + coin + '/transactions'
  },
  DEPOSIT: (coin) => {
    return '/wallet/' + coin + '/deposit'
  },
  WITHDRAW: (coin) => {
    return '/wallet/' + coin + '/withdraw'
  },
  WITHDRAWAL_ADDRESS_FOR_COIN: (coin) => {
    return '/wallet/' + coin + '/withdrawal-address'
  },
  WITHDRAWAL_ADDRESSES: '/wallet/withdrawal-addresses',
  TRANSACTION_STATUS: (transaction) => {
    return '/wallet/transactions/' + transaction + '/status'
  },
  STATISTICS: '/util/statistics',
  HEALTH: (message) => {
    return '/health/echo/' + message
  },
  TERMS_OF_USE: '/terms-of-use',
  KYC_VERIFICATION: (id) => {
    return `/users/${id}/kyc`
  },
  USERS: '/users',
  UPDATE_USER: (id) => {
    return `/users/${id}`
  }
}

const MAX_UPLOAD_SIZE = 25485760

module.exports = {
  AUTH_METHODS,
  PATHS,
  ENVIRONMENT,
  MAX_UPLOAD_SIZE
}
