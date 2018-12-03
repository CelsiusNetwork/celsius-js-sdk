const http = require("http");
const { AUTH_METHODS } = require("./consts");
const util = require("./util");

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
  const Util = util();

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
     * @return {object} Api response
     */
    get: async function (path) {
      const httpOptions = this.getHttpOptions("GET", path);

      return this.dispatchHttpRequest(httpOptions);
    },

    /**
     * @description Sends a HTTP POST request to the api.
     *
     * @function post
     *
     * @param {string} path Endpoint path
     * @param {object} formFields Form fields to be sent with request
     * @param {object} files Files to be sent with request
     * @return {object} Api response
     */
    post: function (path, formFields, files = null) {
      const httpOptions = this.getHttpOptions("POST", path);

      return this.dispatchHttpRequest(httpOptions, formFields, files);
    },

    /**
     * @description Sends a request to the api.
     *
     * @function dispatchHttpRequest
     *
     * @param {HttpOptions} httpOptions
     * @param {object} formFields Form fields to be sent with request
     * @param {object} files Files to be sent with request
     * @returns {Object} Api response
     */

    dispatchHttpRequest: function (httpOptions, formFields = null, files = null) {
      return new Promise(function (resolve, reject) {

        let multipartData = null;
        if (formFields || files) {
          multipartData = Util.getMultipartData(formFields, files);
        }

        let req = http.request(httpOptions, function (res) {

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

        if (multipartData) {
          req.setHeader('Content-Type', 'multipart/form-data; boundary=' + multipartData.boundary);
          req.setHeader('Content-Length', multipartData.contentLength);

          req.write(multipartData.multipartBody);
        }

        req.end()
      });
    },
  };

  return methods;
};

module.exports = {
  HttpClient
};

