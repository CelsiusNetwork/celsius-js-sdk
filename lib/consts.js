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
 * @type {{KYC: string, SUPPORTED_CURRENCIES: string, SUPPORTED_COUNTRIES: string, BALANCE_SUMMARY: string, TRANSACTIONS_SUMMARY: string, COIN_BALANCE: (function(*): string), COIN_TRANSACTIONS: (function(*): string), DEPOSIT: (function(*): string), WITHDRAW: (function(*): string), TRANSACTION_STATUS: (function(*): string), TERMS_OF_USE: string}}
 * @constant
 */
const PATHS = {
  KYC: '/kyc',
  BALANCE_SUMMARY: '/wallet/balance',
  INTEREST_SUMMARY: '/wallet/interest',
  TRANSACTIONS_SUMMARY: '/wallet/transactions',
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
  USERS: '/institutional/users',
  CREATE_USER: '/institutional/user',
  CHANGED_METADATA: (id) => {
    return `/institutional/${id}/metadata`
  },
  CHANGE_WITHDRAWAL_ADDRESS: (id) => {
    return `/institutional/${id}/withdrawal-address`
  },
  SUPPORTED_CURRENCIES: '/util/supported_currencies',
  STATISTICS: '/util/statistics',
  INTEREST_RATES: '/util/interest/rates',
  SUPPORTED_COUNTRIES: '/util/countries',
  TERMS_OF_USE: '/terms-of-use'
}

const MAX_UPLOAD_SIZE = 25485760

module.exports = {
  AUTH_METHODS,
  PATHS,
  ENVIRONMENT,
  MAX_UPLOAD_SIZE
}
