const {Celsius, AUTH_METHODS, ENVIRONMENT } = require('../index')

const expect = require('chai').expect
const {
  newUser,
  partnerKeyToken,
  documents,
  partnerKeyApiKey,
  publicKey
} = require('./utils')
const { Util } = require('../lib/util')

describe('Errors Test', async function () {

  it('Invalid authentication method provided', async () => {
    try {
      let wrongPartner = await Celsius({
        partnerKey: partnerKeyToken, // partner key
        environment: ENVIRONMENT.STAGING
      })
    } catch (error) {
      expect(error.message).to.be.equal('Invalid authentication method provided.')
    }
  })

  it('Null partner key', async () => {
    try {
      let wrongPartner = await Celsius({
        authMethod: AUTH_METHODS.API_KEY, // Auth method
        environment: ENVIRONMENT.STAGING, // Wallet-API url
        publicKey: publicKey // public key
      })
    } catch (error) {
      expect(error.message).to.be.equal('Partner key can not be null.')
    }
  })

  // it('Response signature verification failed', async () => {
  //   try {
  //     let wrongPartner = await Celsius({
  //       authMethod: AUTH_METHODS.API_KEY, // Auth method
  //       partnerKey: partnerKeyApiKey, // partner key
  //       environment: ENVIRONMENT.STAGING, // Wallet-API url
  //     })
  //
  //     // We're sending an empty object as we don't want even to parse the response.
  //     await wrongPartner.getKycStatus(newUser)
  //   } catch (error) {
  //     console.log(error)
  //     expect(error.message).to.be.equal('Response signature verification failed.')
  //   }
  // })

  it('No public key provided', async () => {
    try {
      const util = Util({})
      util.verifyResponse('example', 'test')
    } catch (error) {
      expect(error.message).to.be.equal('No public key provided.')
    }
  })
})
