const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  newUser,
  partnerKeyToken,
  baseUrl,
  publicKey,
  documents,
} = require('./utils')
let instance, supportedCurrencies

const mockKycData = {
  first_name: 'Satoshi',
  last_name: 'Nakamoto',
  date_of_birth: '1990-04-14',
  citizenship: 'Serbia',
  country: 'Serbia',
  state: 'United State',
  city: 'Belgrade',
  zip: '123',
  street: '3rd Street',
  building_number: '15a',
  flat_number: '1c',
  itin: '123-456-789',
  national_id: '123-456-789',
  ssn: '',
  middle_name: '',
  title: 'mr222',
  phone_number: '+3811234567890',
  document_type: 'passport'
}

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
    const { message } = await instance.verifyKyc(mockKycData, documents, newUser)
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
