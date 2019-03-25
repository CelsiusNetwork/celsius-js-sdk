const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  newUser,
  transactionStates,
  partnerKey,
  baseUrl,
  publicKey,
  wrongUserAddress,
  transactionId,
  userAddress,
  documents,
  userKYCData
} = require('./test-config')
let instance, supportedCurrencies

describe('SDK Test', async function () {

  before(async () => {
    instance = await Celsius({
    authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
    partnerKey: partnerKey, // partner key
    baseUrl: baseUrl, // Wallet-API url
    publicKey: publicKey // public key
    })
  })

  it('Should returns KYC status collecting', async () => {
    const kycStatus = await instance.getKycStatus(newUser)
    expect(kycStatus.status).to.be.equal('COLLECTING')
  })

  it('KYC request', async () => {
    const { message } = await instance.verifyKyc(userKYCData, documents, newUser)
    expect(message).to.be.equal('Kyc started.')
  })

  it('Should returns KYC status passed', async () => {
    const kycStatus = await instance.getKycStatus(oldUser)
    expect(kycStatus.status).to.be.equal('PASSED')
  })

  it('Gets supported currencies', async () => {
    supportedCurrencies = await instance.getSupportedCurrencies()
    expect(supportedCurrencies).to.be.a('object')
    expect(supportedCurrencies.currencies).to.be.a('array')
  })

  it('Should returns balance', async () => {
    let { balance } = await instance.getBalanceSummary(oldUser)
    expect(keysToUpperCase(balance)).to.have.all.keys(supportedCurrencies.currencies)
  })

  it('Should returns balance for coin', async () => {
    let balance = await instance.getCoinBalance('BTC', oldUser)
    expect(balance).to.have.all.keys('amount', 'amount_in_usd')
  })

  it('Should returns interest', async () => {
    let { interest } = await instance.getInterestSummary(oldUser)
    expect(interest).to.be.a('object')
  })

  it('Should returns history of transactions', async () => {
    let { record }  = await instance.getTransactionSummary({}, oldUser)
    expect(record).to.be.a('array')
  })

  it('Should returns history of transactions by coin', async () => {
    let { record }  = await instance.getCoinTransactions('BTC', {}, oldUser)
    expect(record).to.be.a('array')
  })

  it('Should returns address for deposit', async () => {
    let { address } = await instance.getDeposit('BTC', oldUser)
    expect(address).to.be.a('string')
  })

  it('Successfully withdrawn', async () => {
    const data = {
      amount: 0.111,
      address: userAddress,
    }
    let { transaction_id }  = await instance.withdraw('BTC', data, oldUser)
    expect(transaction_id).to.be.a('string')
  })

  it('Withdraw - Invalid address', async () => {
    try {
      const data = {
        amount: 2,
        address: wrongUserAddress,
      }
      await instance.withdraw('BTC', data, oldUser)
    } catch (e) {
      expect(e.message).to.be.equal('Invalid address provided for partner\'s withdrawal scheme.')
    }
  })

  it('Should returns transaction status', async () => {
    let { state } = await instance.getTransactionStatus(transactionId, oldUser)
    expect(state).to.be.a('string')
    expect(state).to.be.oneOf(transactionStates)
  })

  it('Should returns interest rates', async () => {
    let { interestRates } = await instance.getInterestRates()
    expect(interestRates).to.be.a('array')
  })
})

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
