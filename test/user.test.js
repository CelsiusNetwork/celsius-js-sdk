const {Celsius, AUTH_METHODS, ENVIRONMENT} = require('../index')
const expect = require('chai').expect
const {
  newUser,
  partnerKeyToken,
  publicKey,
  userAddress
} = require('./utils')
let instance, user


describe('User Test', async function () {

  before(async () => {
    instance = await Celsius({
      authMethod: AUTH_METHODS.USER_TOKEN, // Auth method
      partnerKey: partnerKeyToken, // partner key
      environment: ENVIRONMENT.STAGING,
      publicKey: publicKey // public key
    })
  })

  it('Get users', async () => {
    let { users } = await instance.getUsers({}, newUser)

    user = users.results.find((element) => {
      return element.api_token === newUser
    })

    expect(users).to.be.a('object')
  }).timeout(3500)

  it('Change metadate', async () => {
    let { message } = await instance.changeMetadata(user.id, {example: 'example'}, newUser)
    expect(message).to.be.equal('User`s metadata has been updated')
  })

  it('Change withdrawal address', async () => {
    let userObj = await instance.changeWithdrawalAddress(user.id, {short: 'ETH', address: userAddress}, newUser)
    expect(userObj).to.be.a('object')
  })

  // it('Create user', async () => {
  //   const l = await instance.createUser({taxNumber: 123, companyName: 'asdf', email: 'asdfas@sadf.com', contactPerson: 1234, country: 'Serbia', contactEmail: 'asd@afsd.com', withdrawalWallets: JSON.stringify([{short: 'ETH', address: '4N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}])}, newUser)
  //
  //   console.log(l)
  //   // let { message } = await instance.createUser({taxNumber: 123, companyName: 'asdf', email: 'asdfas@sadf.com', contactPerson: 1234, country: 'Serbia', contactEmail: 'asd@afsd.com', withdrawalWallets: JSON.stringify([{short: 'ETH', address: '4N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}])}, newUser)
  //   expect(l.message).to.be.equal('User has been created')
  // })

  it('Validation error - create user', async () => {
    try {
      await instance.createUser({contactEmail: 'asd@afsd.com', withdrawalWallets: JSON.stringify([{short: 'ETH', address: '4N2tz7rrbK17236DPrFx67KjXmUafUMsnsN'}])}, newUser)
    } catch (error) {
      expect(error.status).to.be.equal(400)
    }
  })
})
