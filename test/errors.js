const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  newUser,
  partnerKeyApiKey,
  baseUrl,
  publicKey,
  documents,
  userKYCData
} = require('./test-config')
const { Util } = require('../lib/util')

describe('Errors Test', async function () {

  it('Invalid authentication method provided', async () => {
    try {
      let wrongPartner = await Celsius({
        partnerKey: partnerKeyApiKey, // partner key
        baseUrl: baseUrl, // Wallet-API url
        publicKey: publicKey // public key
      })
    } catch (error) {
      expect(error.message).to.be.equal('Invalid authentication method provided.')
    }
  })

  it('Null partner key', async () => {
    try {
      let wrongPartner = await Celsius({
        authMethod: AUTH_METHODS.API_KEY, // Auth method
        baseUrl: baseUrl, // Wallet-API url
        publicKey: publicKey // public key
      })
    } catch (error) {
      expect(error.message).to.be.equal('Partner key can not be null.')
    }
  })

  it('Response signature verification failed', async () => {
    try {
      let wrongPartner = await Celsius({
        authMethod: AUTH_METHODS.API_KEY, // Auth method
        partnerKey: partnerKeyApiKey, // partner key
        baseUrl: baseUrl, // Wallet-API url
      })

      await wrongPartner.verifyKyc(userKYCData, documents, newUser)
    } catch (error) {
      expect(error.message).to.be.equal('Response signature verification failed.')
    }
  })

  it('No public key provided', async () => {
    try {
      const util = Util({})
      util.verifyResponse('example', 'test')
    } catch (error) {
      expect(error.message).to.be.equal('No public key provided.')
    }
  })
})
