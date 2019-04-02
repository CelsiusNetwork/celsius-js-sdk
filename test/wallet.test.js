const {Celsius, AUTH_METHODS, ENVIRONMENT} = require('../index')
const expect = require('chai').expect
const {
  newUser,
  transactionStates,
  partnerKeyToken,
  publicKey,
  wrongUserAddress,
  userAddress,
  keysToUpperCase,
  oldUser,
  transactionId
} = require('./utils')
let instance, supportedCurrencies

describe('Wallet Test', async function () {

  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      environment: ENVIRONMENT.STAGING,
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
    let {interest} = await instance.getInterestSummary(newUser)
    expect(interest).to.be.a('object')
  })

  it('History of transactions', async () => {
    let {record} = await instance.getTransactionSummary({}, newUser)
    expect(record).to.be.a('array')
  })

  it('History of transactions by coin', async () => {
    let {record} = await instance.getCoinTransactions('ETH', {}, newUser)
    expect(record).to.be.a('array')
  })

  it('Address for deposit', async () => {
    let {address} = await instance.getDeposit('BTC', oldUser)
    expect(address).to.be.a('string')
  })

  it('Successfully withdrawn', async () => {
    const data = {
      amount: 0.0007,
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
      await instance.withdraw('ETH', data, newUser)
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
