const AUTH_METHODS = {
  API_KEY: "api-key",
  USER_TOKEN: "user-token"
};

const PATHS = {
  KYC_STATUS: "/kyc",
  BALANCE_SUMMARY: "/wallet/balance",
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
};

module.exports = {
  AUTH_METHODS,
  PATHS
};
