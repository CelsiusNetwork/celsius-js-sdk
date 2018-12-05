/**
 * @description Public key for verify response.
 * @type {string}
 * @constant
 */
const PUBLIC_KEY = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4K0VBRkUvQVlUNnQ2UVBERWl0WApDc0FWenZSdFhQUzVaMS85c0JyUEpVSWF5UDZqbHZQRnFsWDFPdCtrcUZYWGtweUQ2V1Arak5nMmNiWlg3MXVDCkFKdThTMjhaTnk3U2N3ZTZiQnJkMllzdlBBM2VCWGtKU2QrTHc0MjhBZEIxQzAxYUs1R09tejJsQTZWTktHM3EKUXQyWWdmbTkwWURxcTZDV1h1ZUJWd05uUUdqQi9lMTdxOVdTTk41VG1QM0tBcWlFc0tMTHM2a1ljVHdDbjZYYwpnSWd2K3VXZUtmTnVMbDgzNUpGUUFMc2FBMm5lc0JPODRHbE45ZllxelhsWXFFMEc3bU1kUkRhZ2FSNlJQZXFPCktlQzVLbXdydUowajYvWWR5dGl2KzRqUFZCcTFIVm5kTzFvaFQ3d3cyeEVyZXpjeGdvM1JHd2dMNHJBUTRyU0MKWFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'

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
 * @type {{KYC: string, BALANCE_SUMMARY: string, TRANSACTIONS_SUMMARY: string, COIN_BALANCE: (function(*): string), COIN_TRANSACTIONS: (function(*): string), DEPOSIT: (function(*): string), WITHDRAW: (function(*): string), TRANSACTION_STATUS: (function(*): string)}}
 * @constant
 */
const PATHS = {
  KYC: '/kyc',
  BALANCE_SUMMARY: '/wallet/balance',
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
  TRANSACTION_STATUS: (transaction) => {
    return '/wallet/transactions/' + transaction + '/status'
  }
}

const ERRORS = {
  INVALID_AUTH_METHOD: 'Invalid authentication method provided.',
  RESPONSE_VERIFICATION_FAILED: 'Response signature verification failed.',
  INVALID_PARTNER_KEY: 'Partner key can not be null.'
}

module.exports = {
  PUBLIC_KEY,
  AUTH_METHODS,
  PATHS,
  ERRORS
}
