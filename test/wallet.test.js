const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  transactionStates,
  partnerKeyToken,
  baseUrl,
  publicKey,
  wrongUserAddress,
  transactionId,
  userAddress,
  keysToUpperCase
} = require('./test-config')
let instance, supportedCurrencies

describe('Wallet Test', async function () {

  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      baseUrl: baseUrl, // Wallet-API url
      publicKey: publicKey // public key
    })
    supportedCurrencies = instance.currencies
  })

  it('Balance', async () => {
    let {balance} = await instance.getBalanceSummary(oldUser)
    expect(keysToUpperCase(balance)).to.have.all.keys(supportedCurrencies)
  })

  it('Balance for coin', async () => {
    let balance = await instance.getCoinBalance('BTC', oldUser)
    expect(balance).to.have.all.keys('amount', 'amount_in_usd')
  })

  it('Interest summary', async () => {
    let {interest} = await instance.getInterestSummary(oldUser)
    expect(interest).to.be.a('object')
  })

  it('History of transactions', async () => {
    let {record} = await instance.getTransactionSummary({}, oldUser)
    expect(record).to.be.a('array')
  })

  it('History of transactions by coin', async () => {
    let {record} = await instance.getCoinTransactions('BTC', {}, oldUser)
    expect(record).to.be.a('array')
  })

  it('Address for deposit', async () => {
    let {address} = await instance.getDeposit('BTC', oldUser)
    expect(address).to.be.a('string')
  })

  it('Successfully withdrawn', async () => {
    const data = {
      amount: 0.111,
      address: userAddress,
    }
    let {transaction_id} = await instance.withdraw('BTC', data, oldUser)
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

  it('Transaction status', async () => {
    let {state} = await instance.getTransactionStatus(transactionId, oldUser)
    expect(state).to.be.a('string')
    expect(state).to.be.oneOf(transactionStates)
  })
})