const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const FormData = require('form-data')

const { ERRORS } = require('./consts')
/**
 * @typedef {object} Util
 * @property {function} getFormData - Method for getting form data from formFields and files
 * @property {function} readFile - Method for reading files
 * @property {function} verifyResponse - Method for verifying responses
 */

/**
 * Celsius js SDK Util
 * @module celsius-js-sdk/util
 */

/**
 * Creates and configures Util
 *
 * @function
 *
 * @param {object} config - Contains configuration data
 * @returns {Util}
 */
const Util = function (config) {
  const Util = this
  Util.config = config

  return {
    /**
     * Creates and returns form data from provided form fields and files
     *
     * @function
     *
     * @param {object} formFields - Object containing form fields
     * @param {object} files - Object containing files. Keys are field names, values are paths
     * @returns {Promise} FormData that is to be sent with a request
     */
    getFormData: function (formFields, files) {
      return new Promise((resolve, reject) => {
        const formData = new FormData({ maxDataSize: 10485760 })

        for (const key in formFields) {
          if (formFields.hasOwnProperty(key)) {
            formData.append(key, formFields[key])
          }
        }

        const promises = []
        const fileMetadata = []

        for (const key in files) {
          if (files.hasOwnProperty(key)) {
            const filePath = files[key]
            fileMetadata.push({
              name: path.basename(filePath),
              fieldName: key
            })
            promises.push(this.readFile(filePath))
          }
        }

        Promise.all(promises).then((results) => {
          for (let i = 0; i < results.length; i++) {
            const metadata = fileMetadata[i]
            formData.append(metadata.fieldName, results[i], {
              filename: metadata.name
            })
          }
          resolve(formData)
        })
      })
    },

    /**
     * Reads a file asynchronously.
     *
     * @function readFile
     *
     * @param {string} filePath - Path to the file
     * @returns {Promise} Contents of a file stored in a buffer
     */
    readFile: function (filePath) {
      return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)

        const chunks = []

        stream.on('data', function (chunk) {
          chunks.push(chunk)
        })

        stream.on('end', function () {
          return resolve(Buffer.concat(chunks))
        })
      })
    },

    /**
     * Verifies responses received from api.
     *
     * @function verifyResponse
     *
     * @param {object} data - Response data
     * @param {string} signature - Header containing signature
     * @returns {boolean} Result of verification
     */
    verifyResponse: function (data, signature) {
      let publicKey = Util.config.publicKey
      if (!publicKey) {
        throw new Error(ERRORS.NO_PUBLIC_KEY)
      }
      publicKey = Buffer.from(publicKey, 'base64').toString()
      return crypto.createVerify('sha256').update(JSON.stringify(data)).verify(publicKey, signature, 'base64')
    }
  }
}

class ValidationError {
  constructor (error) {
    this.status = error.status

    if (error.data.message) {
      this.message = error.data.message
    } else {
      this.message = error.data
    }
  }
}

module.exports = {
  Util,
  ValidationError
}
