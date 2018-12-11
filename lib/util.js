const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const FormData = require('form-data')

const { ERRORS } = require('./consts')

const Util = function (config) {
  const Util = this
  Util.config = config

  return {
    getFormData: function (formFields, files) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()

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

module.exports = {
  Util
}
