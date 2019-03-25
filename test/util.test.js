const {Celsius, AUTH_METHODS, ENVIRONMENT} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  partnerKeyToken,
  baseUrl,
  publicKey,
  partnerKeyApiKey
} = require('./utils')
let instance, supportedCurrencies

describe('Util Test', async function () {
  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      baseUrl: baseUrl, // Wallet-API url
      publicKey: publicKey // public key
    })
  })

  it('Partner statistics', async () => {
    let data = await instance.getStatistics(oldUser)
    expect(data).to.be.a('object')
  })

  it('Gets supported currencies', async () => {
    supportedCurrencies = await instance.getSupportedCurrencies()
    expect(supportedCurrencies).to.be.a('object')
    expect(supportedCurrencies.currencies).to.be.a('array')
  })

  it('Interest rates', async () => {
    let { interestRates } = await instance.getInterestRates()
    expect(interestRates).to.be.a('array')
  })

  it('Should creates api-key partner', async () => {
    let apiKeyPartner = await Celsius({
      authMethod: AUTH_METHODS.API_KEY, // Auth method
      partnerKey: partnerKeyApiKey, // partner key
      environment: ENVIRONMENT.STAGING, // Wallet-API url
      publicKey: publicKey // public key
    })
  })
})
