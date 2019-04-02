const crypto = require('crypto')

require('dotenv').config()

const documents = {
  document_front_image: './test/assets/blank.jpg',
  document_back_image: './test/assets/blank.jpg'
}

function keysToUpperCase(obj) {
  Object.keys(obj).forEach(function (key) {
    var k = key.toUpperCase()

    if (k !== key) {
      obj[k] = obj[key]
      delete obj[key]
    }
  })
  return (obj)
}

module.exports = {
  newUser: crypto.randomBytes(16).toString("hex"),
  newKycUser: crypto.randomBytes(16).toString("hex"),
  documents: documents,
  userId: process.env.USER_ID,
  oldUser: process.env.OLD_USER, // existing user
  wrongUserAddress: process.env.WRONG_ADDRESS, // wrong address
  userAddress: process.env.USER_ADDRESS, // valid address
  transactionStates: ['confirmed', 'canceled', 'locked', 'signed', 'removed', 'unconfirmed'],
  userToken: process.env.USER_TOKEN,
  partnerKeyToken: process.env.TOKEN_PARTNER_KEY,
  partnerKeyApiKey: process.env.API_PAERTENR_KEY,
  partnerKYC: process.env.PARTNER_KYC,
  keysToUpperCase: keysToUpperCase,
  publicKey:process.env.PUBLIC_KEY,
  baseUrl: 'http://localhost:4000',
  transactionId: process.env.TRANSACTION_ID
}
