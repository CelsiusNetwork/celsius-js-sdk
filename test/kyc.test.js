const {Celsius, AUTH_METHODS, ENVIRONMENT} = require('../index')
const expect = require('chai').expect
const {
  newUser,
  partnerKeyToken,
  publicKey,
  partnerKYC,
  documents,
  newKycUser,
} = require('./utils')
let partnerWithoutKyc, partnerWithoKyc

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
    partnerWithoutKyc = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      environment: ENVIRONMENT.STAGING, // Wallet-API url
      publicKey: publicKey // public key
    })
  })

  it('KYC status passed', async () => {
    const kycStatus = await partnerWithoutKyc.getKycStatus(newUser)
    expect(kycStatus.status).to.be.equal('PASSED')
  })

  it('Create kyc partner', async () => {
    partnerWithoKyc = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN,
      partnerKey: partnerKYC,
      environment: ENVIRONMENT.STAGING,
      publicKey: publicKey
    })
  })

  it('KYC status collecting', async () => {
    const kycStatus = await partnerWithoKyc.getKycStatus(newKycUser)
    expect(kycStatus.status).to.be.equal('COLLECTING')
  })

  it('KYC verify', async () => {
    const { message } = await partnerWithoKyc.verifyKyc(mockKycData, documents, newKycUser)
    expect(message).to.be.equal('Kyc started.')
  }).timeout(3500)

  it('KYC verification error', async () => {
    try {
      await partnerWithoKyc.verifyKyc({}, documents, newKycUser)
    } catch (error) {
      expect(error.message).to.be.a('array')
    }
  })
})
