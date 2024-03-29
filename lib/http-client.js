const axios = require('axios')
const querystring = require('querystring')

const { AUTH_METHODS, MAX_UPLOAD_SIZE } = require('./consts')
const { Util } = require('./util')
const { ERROR_MESSAGES, CelsiusSDKError, ValidationError } = require('./errors')

/**
 * @typedef {object} HttpClient
 * @property {function} get Method for sending GET requests
 * @property {function} post Method for sending POST requests. Data is transmitted using multipart/form-data
 * @property {function} put Method for sending PUT requests. Data is transmitted using multipart/form-data
 */

/**
 * Celsius js SDK Http Client
 * @module celsius-js-sdk/http-client
 */

/**
 * Creates and configures HttpClient.
 *
 * @function
 *
 * @param {object} config - contains configuration data
 * @returns {HttpClient}
 */
const HttpClient = function (config) {
  const HttpClient = this
  const util = Util(config)

  HttpClient.config = config
  HttpClient.headers = {
    'X-Cel-Partner-Token': config.partnerKey
  }

  /**
   * Sends HTTP request to the api.
   *
   * @private
   * @function _dispatchAxiosRequest
   *
   * @param {string} method - Http Method (GET, POST, etc.)
   * @param {string} path - Url that is the target of request
   * @param {object} headers - Headers to be sent with request
   * @param {object} data - Data to be sent with request
   *
   * @returns {Promise} Response
   */

  function _dispatchAxiosRequest (method, path, headers, data) {
    return axios({
      method: method,
      url: config.baseUrl + path,
      headers: headers,
      data: data,
      maxContentLength: MAX_UPLOAD_SIZE
    })
      .then((response) => {
        if (!util.verifyResponse(response.data, response.headers['x-signature'])) {
          return Promise.reject(new CelsiusSDKError(ERROR_MESSAGES.RESPONSE_VERIFICATION_FAILED))
        }

        return Promise.resolve(response.data)
      })
      .catch((error) => {
        if (error instanceof CelsiusSDKError) {
          return Promise.reject(error)
        }
        try {
          if (error.response) {
            if (!util.verifyResponse(error.response.data, error.response.headers['x-signature'])) {
              return Promise.reject(new CelsiusSDKError(ERROR_MESSAGES.RESPONSE_VERIFICATION_FAILED))
            }

            if (!error.response.data.message) {
              return Promise.reject(new ValidationError(error.response))
            }

            return Promise.reject(new CelsiusSDKError(error.response.data.message, error.response.data.slug, error.response.status))
          }

          return Promise.reject(new CelsiusSDKError(error.message, null, null, error))
        } catch (error) {
          return Promise.reject(new CelsiusSDKError(error.message, null, null, error))
        }
      })
  }

  /**
   * Adds authentication header to existing headers.
   * Authentication method is read from config.
   * Based on it, appropriate header gets added to existing headers
   * with the value of user secret (also contained in config).
   *
   * @private
   * @function _getHeaders
   *
   * @param {object} config - Contains authentication method and user secret
   * @returns {object} Headers
   */
  function _getHeaders (config) {
    const headers = HttpClient.headers

    if (HttpClient.config.authMethod === AUTH_METHODS.API_KEY) {
      headers['X-Cel-Api-Key'] = config.userSecret
    } else if (HttpClient.config.authMethod === AUTH_METHODS.USER_TOKEN) {
      headers['X-Cel-User-Token'] = config.userSecret
    }

    return headers
  }

  return {
    /**
     * Sends a HTTP GET request.
     *
     * @function get
     *
     * @param {string} path - Endpoint path
     * @param {object} queryParams - Parameters to be sent via query string
     * @param {string} userSecret - User's secret token or api-key
     *
     * @return {object} Response
     */
    get: function (path, queryParams, userSecret) {
      const headers = _getHeaders({ userSecret })
      queryParams = querystring.stringify(queryParams)
      return _dispatchAxiosRequest('GET', path + '?' + queryParams, headers, null)
    },

    /**
     * Sends a HTTP POST request.
     *
     * @function post
     *
     * @param {string} path - Endpoint path
     * @param {object} formFields - Form fields to be sent
     * @param {object} files - Files to be sent
     * @param {string} userSecret - User's secret token or api-key
     *
     * @return {Promise} Response
     */
    post: function (path, formFields, files, userSecret) {
      return util.getFormData(formFields, files).then((formData) => {
        let headers = _getHeaders({ userSecret })
        headers = formData.getHeaders(headers)

        return _dispatchAxiosRequest('POST', path, headers, formData)
      })
    },

    /**
     * Sends a HTTP PUT request.
     *
     * @function put
     *
     * @param {string} path - Endpoint path
     * @param {object} formFields - Form fields to be sent
     * @param {object} files - Files to be sent
     * @param {string} userSecret - User's secret token or api-key
     *
     * @return {Promise} Response
     */
    put: function (path, formFields, files, userSecret) {
      return util.getFormData(formFields, files).then((formData) => {
        let headers = _getHeaders({ userSecret })
        headers = formData.getHeaders(headers)

        return _dispatchAxiosRequest('PUT', path, headers, formData)
      })
    }
  }
}

module.exports = {
  HttpClient
}
