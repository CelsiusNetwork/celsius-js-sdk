const { defaultConfig } = require('./config');
const { PATHS } = require('./consts');
const { HttpClient } = require('./http-client');
const querystring = require('querystring');

const Celsius = function (config) {
  config = Object.assign(defaultConfig, config);
  const httpClient = HttpClient(config);

  return {
    getKycStatus: function () {
      return httpClient.get(PATHS.KYC_STATUS);
    },

    getBalanceSummary: function () {
      return httpClient.get(PATHS.BALANCE_SUMMARY);
    },

    getCoinBalance: function (coin) {
      return httpClient.get(PATHS.COIN_BALANCE(coin));
    },

    getTransacionSummary: function (pagination) {
      const queryParams = querystring.stringify({
        page: pagination.page,
        per_page: pagination.perPage
      });
      const url = [PATHS.TRANSACTIONS_SUMMARY, queryParams].join('?');

      return httpClient.get(url);
    },

    getCoinTransactions: function (coin, pagination) {
      const queryParams = querystring.stringify({
        page: pagination.page,
        per_page: pagination.perPage
      });
      const url = [PATHS.COIN_TRANSACTIONS(coin), queryParams].join('?');

      return httpClient.get(url);
    },

    getDeposit: function (coin) {
      return httpClient.get(PATHS.DEPOSIT(coin));
    },

    getTransactionStatus: function (transaction) {
      return httpClient.get(PATHS.TRANSACTION_STATUS(transaction));
    },
  }
};

module.exports = {
  Celsius
};
