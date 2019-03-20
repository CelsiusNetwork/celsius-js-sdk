const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  newUser,
  partnerKeyToken,
  baseUrl,
  publicKey,
  documents,
  userKYCData
} = require('./test-config')
let instance, supportedCurrencies

describe('KYC Test', async function () {
  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      baseUrl: baseUrl, // Wallet-API url
      publicKey: publicKey // public key
    })
  })

  it('KYC status collecting', async () => {
    const kycStatus = await instance.getKycStatus(newUser)
    expect(kycStatus.status).to.be.equal('COLLECTING')
  })

  it('KYC verify', async () => {
    const { message } = await instance.verifyKyc(userKYCData, documents, newUser)
    expect(message).to.be.equal('Kyc started.')
  })

  it('KYC verification error', async () => {
    try {
      await instance.verifyKyc({}, documents, newUser)
    } catch (error) {
      expect(error.message).to.be.a('array')
    }
  })

  it('KYC status passed', async () => {
    const kycStatus = await instance.getKycStatus(oldUser)
    expect(kycStatus.status).to.be.equal('PASSED')
  })
})