const axios = require('axios')
const querystring = require('querystring')

const { AUTH_METHODS, ERRORS } = require('./consts')
const { Util } = require('./util')

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

const HttpClient = function (config) {
  const HttpClient = this
  const util = Util(config)

  HttpClient.config = config
  HttpClient.headers = {
    'X-Cel-Partner-Token': config.partnerKey
  }

  function _dispatchAxiosRequest (method, path, headers, data) {
    return axios({
      method: method,
      url: config.baseUrl + path,
      headers: headers,
      data: data
    })
      .then((response) => {
        if (!util.verifyResponse(response.data, response.headers['x-signature'])) {
          return Promise.resolve(new Error(ERRORS.RESPONSE_VERIFICATION_FAILED))
        }
        return Promise.resolve(response.data)
      })
      .catch((error) => {
        let err = error
        if (error.response) {
          if (!util.verifyResponse(error.response.data, error.response.headers['x-signature'])) {
            return Promise.resolve(new Error(ERRORS.RESPONSE_VERIFICATION_FAILED))
          }
          err = error.response.data
          return Promise.resolve(err)
        }

        return Promise.reject(err)
      })
  }

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
     * @description Sends a HTTP GET request to the api.
     *
     * @function get
     *
     * @param {string} path Endpoint path
     * @param {object} queryParams Parameters to be sent via query string
     * @param {string} userSecret User's secret token or api-key
     * @return {object} Api response
     */
    get: function (path, queryParams, userSecret) {
      const headers = _getHeaders({ userSecret })
      queryParams = querystring.stringify(queryParams)
      return _dispatchAxiosRequest('GET', path + '?' + queryParams, headers, null)
    },

    /**
     * @description Sends a HTTP POST request to the api.
     *
     * @function post
     *
     * @param {string} path Endpoint path
     * @param {object} formFields Form fields to be sent
     * @param {object} files Files to be sent
     * @param {string} userSecret User's secret token or api-key
     *
     * @return {object} Api response
     */
    post: function (path, formFields, files, userSecret) {
      return new Promise((resolve, reject) => {
        util.getFormData(formFields, files).then((formData) => {
          let headers = _getHeaders({ userSecret })
          headers = formData.getHeaders(headers)

          return resolve(_dispatchAxiosRequest('POST', path, headers, formData))
        })
      })
    }
  }
}

module.exports = {
  HttpClient
}
