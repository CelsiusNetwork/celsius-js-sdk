const http = require("http");
const { AUTH_METHODS } = require("./consts");

/**
 * @typedef {Object} HttpOptions
 * @property {string} method Http Method (GET, POST, etc.)
 * @property {string} hostname
 * @property {number} port Port number
 */

/**
 * Node Celsius SDK Http Client
 *
 * @module celsius-sdk/http-client
 * @param {object} config - contains configuration data
 * @return {object} instance to class object
 */

const HttpClient = function(config) {
  const HttpClient = this;

  HttpClient.config = config;
  HttpClient.headers = {
    'X-Cel-Partner-Token': config.partnerKey,
  };

  if (config.authMethod === AUTH_METHODS.API_KEY) {
    HttpClient.headers["X-Cel-Api-Key"] = config.userSecret;
  } else if (config.authMethod === AUTH_METHODS.USER_TOKEN) {
    HttpClient.headers["X-Cel-User-Token"] = config.userSecret;
  }

  const methods = {
    /**
     * @description Generates HttpOptions object.
     *
     * @function getHttpOptions
     *
     * @param method {string} HTTP Method
     * @param path {string} Endpoint path
     * @return {HttpOptions} HttpOptions
     */
    getHttpOptions: function (method, path) {
      return {
        method: method,
        hostname: HttpClient.config.hostname,
        port: HttpClient.config.port,
        path: path,
        headers: HttpClient.headers
      };
    },

    /**
     * @description Sends a HTTP GET request to the api.
     *
     * @function get
     *
     * @param {string} path Endpoint path
     * @param {object} data Data to be sent to api
     * @return {object} Api response
     */
    get: async function (path, data) {
      const httpOptions = this.getHttpOptions("GET", path);

      return this.dispatchHttpRequest(httpOptions);
    },

    /**
     * @description Sends a HTTP POST request to the api.
     *
     * @function post
     *
     * @param {string} path Endpoint path
     * @param {object} data Data to be sent to api
     * @return {object} Api response
     */
    post: function (path, data) {
      const httpOptions = this.getHttpOptions("POST", path);

      return this.dispatchHttpRequest(httpOptions);
    },

    /**
     * @description Sends a request to the api.
     *
     * @function dispatchHttpRequest
     *
     * @param {HttpOptions} httpOptions
     * @returns {Object} Api response
     */

    dispatchHttpRequest: function (httpOptions) {
      return new Promise(function (resolve, reject) {
        let req = http.request(httpOptions, function (res) {

          if (res.statusCode < 200 || res.statusCode >= 300) {
            reject(res);
          }

          let body = [];

          res.on('data', function(chunk) {
            body.push(chunk);
          });

          res.on('end', function() {
            try {
              body = JSON.parse(Buffer.concat(body).toString());
            } catch (e) {
              reject('error')
            }
            resolve(body);
          })
        });

        req.on('error', function (err) {
          reject(err)
        });

        req.end()
      });
    },
  };

  return methods;

};

module.exports = {
  HttpClient
};

