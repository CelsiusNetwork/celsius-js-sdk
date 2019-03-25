const crypto = require('crypto')

require('dotenv').config()

const documents = {
  document_front_image: './assets/blank.jpg',
  document_back_image: './assets/blank.jpg'
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
  documents: documents,
  userId: 'f9237710-3924-43ea-ae02-7daf99456c89',
  oldUser: 'd41d8cd98f00b204e9800998ecf8427e', // existing user
  wrongUserAddress: '0xasasdsad12dsd1dxsad132c2d', // wrong address
  userAddress: '2N2tz7rrbK17236DPrFx67KjXmUafUMsnsN', // valid address
  transactionId: 'f2b82271-27cd-4f6e-a301-de6132c29f21', // some transaction id, but must be transaction of oldUser
  transactionStates: ['confirmed', 'canceled', 'locked', 'signed', 'removed', 'unconfirmed'],
  userToken: process.env.USER_TOKEN,
  partnerKey: process.env.PARTNER_KEY,
  keysToUpperCase: keysToUpperCase
}
