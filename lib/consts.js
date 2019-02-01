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
 * @type {{KYC: string, SUPPORTED_CURRENCIES: string, BALANCE_SUMMARY: string, TRANSACTIONS_SUMMARY: string, COIN_BALANCE: (function(*): string), COIN_TRANSACTIONS: (function(*): string), DEPOSIT: (function(*): string), WITHDRAW: (function(*): string), TRANSACTION_STATUS: (function(*): string)}}
 * @constant
 */
const PATHS = {
  KYC: '/kyc',
  SUPPORTED_CURRENCIES: '/util/supported_currencies',
  BALANCE_SUMMARY: '/wallet/balance',
  TRANSACTIONS_SUMMARY: '/wallet/transactions',
  USERS: '/institutional/users',
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
  TRANSACTION_STATUS: (transaction) => {
    return '/wallet/transactions/' + transaction + '/status'
  },
  CHANGED_METADATA: (id) => {
    return `/institutional/${id}/metadata`
  },
  CHANGE_WITHDRAWAL_ADDRESS: (id) => {
    return `/institutional/${id}/withdrawal-address`
  }
}

const ERRORS = {
  INVALID_AUTH_METHOD: 'Invalid authentication method provided.',
  RESPONSE_VERIFICATION_FAILED: 'Response signature verification failed.',
  INVALID_PARTNER_KEY: 'Partner key can not be null.',
  NO_PUBLIC_KEY: 'No public key provided.'
}

module.exports = {
  AUTH_METHODS,
  PATHS,
  ERRORS,
  ENVIRONMENT
}
