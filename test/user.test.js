const {Celsius, AUTH_METHODS} = require('../index')
const expect = require('chai').expect
const {
  oldUser,
  userId,
  partnerKeyToken,
  baseUrl,
  publicKey
} = require('./utils')
let instance


describe('User Test', async function () {

  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      baseUrl: baseUrl, // Wallet-API url
      publicKey: publicKey // public key
    })
  })

  it('Change metadate', async () => {
    let { message } = await instance.changeMetadata(userId, {example: 'example'}, oldUser)
    expect(message).to.be.equal('User`s metadata has been updated')
  })

  it('Change withdrawal address', async () => {
    let { user } = await instance.changeWithdrawalAddress(userId, {short: 'ETH', address: '3N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}, oldUser)
    expect(user).to.be.a('object')
  })

  it('Get users', async () => {
    let { users } = await instance.getUsers({}, oldUser)
    expect(users).to.be.a('object')
  })

  it('Create user', async () => {
    let { message } = await instance.createUser({companyName: 'asdf', email: 'asdfas@sadf.com', contactPerson: 1234, country: 'Serbia', contactEmail: 'asd@afsd.com', withdrawalWallets: JSON.stringify([{short: 'ETH', address: '4N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}])}, oldUser)
    expect(message).to.be.equal('User has been created')
  })

  it('Validation error - create user', async () => {
    try {
      await instance.createUser({contactEmail: 'asd@afsd.com', withdrawalWallets: JSON.stringify([{short: 'ETH', address: '4N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}])}, oldUser)
    } catch (error) {
      expect(error.status).to.be.equal(400)
    }
  })
})
