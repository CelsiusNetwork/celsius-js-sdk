const { defaultConfig } = require('./config');
const { PATHS } = require('./consts');
const { HttpClient } = require('./http-client');

const Celsius = function (config) {
  config = Object.assign(defaultConfig, config);
  const httpClient = HttpClient(config);

  return {
    getKycStatus: function () {
      return httpClient.get(PATHS.KYC_STATUS);
    },
  }
};

module.exports = {
  Celsius
};
