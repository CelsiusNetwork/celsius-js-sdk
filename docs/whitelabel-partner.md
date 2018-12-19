![Whitelabel Partner Overview](/assets/images/whitelabel.svg)

# Use case

The Whitelabel API offers partners a way to transparently give their existing users access to Celsius Network features. 

The partner can use the Celsius Network on behalf of their existing or new users, regardless of whether those users are already a part of the Celsius Network, as users created through the Whitelabel partner API will be completely independent from the Celsius Network application users.

## Features

- ***KYC Checking***
> Partner must perform KYC checks through Celsius for the users to be able to deposit.
- ***Deposits & withdrawals***
> Partner's users can do deposits and withdrawals of cryptocurrencies to the Celsius account to start earning interest.
- ***Balance & tranaction checking***
> Partner's users can check their account balances and transaction statuses on different blockchains.

# Getting started

Consult the [Postman docs](https://documenter.getpostman.com/view/4207695/Rzn6v2mZ#31c70317-92dd-4e68-a5db-ea16a81121fa) for the Whitelabel API. 

## Security

1. Partner receives a **partner-token** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Each request Partner sends for his user must be accompanied by a unique **user-token** for that user. User token is used to differentiate different partner's users on the Celsius API.
3. Each response sent back from the Celsius API will be signed using Celsius Network's private key, and will be automatically verified on the SDK receiving end with the hardcoded public key. 

## Initializing the SDK

Initialize SDK in the following way:

```javascript
const { Celsius, AUTH_METHODS, ENVIRONMENT } = require('celsius-sdk')
const partnerKey = process.env.PARTNER_TOKEN // Should be kept secret

const celsius = Celsius({
    authMethod: AUTH_METHODS.USER_TOKEN, // We are telling the SDK that we are authenticating different users using user tokens.
    partnerKey: partnerKey,
    environment: ENVIRONMENT.staging // If not present, default is production.
})

```

>Our recommendation is to set `userToken` to a hash of a unique attribute for your user, e.g. `const userToken = hashFunction(user.id)`
>
> `userToken` will be sent with every API call to differentiate between different users you might have.

## KYC actions

After initializing the SDK, and before you can deposit/withdraw funds and start earning interest on behalf of your user, you need to KYC verify the user using the Celsius API.

### Get current KYC status

```javascript
celsius.getKycStatus(userToken).then((status) => {
  console.log(status)
})
.catch((error) => {
  console.log(error)
}
```

### Run a KYC check

```javascript
const userData = {
  first_name: 'Satoshi',
  last_name: 'Nakamoto',
  date_of_birth: '1990-04-14',
  citizenship: 'Serbia',
  middle_name: '',
  title: 'Mr',
  gender: 'male',
  phone_number: '+3811234567890',
  document_type: 'passport',
};

const documents = {
  document_front_image: '<path>',
  document_back_image: '<path>'
};

const verifyKYC = celsius.verifyKyc(userData, documents, userToken);

```

## Wallet actions

After initializing SDK, you can perform following actions:

### Get balance for all currencies
```javascript
celsius.getBalanceSummary(userToken).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
### Get balance for a single currency
```javascript
const coin = 'BTC'

celsius.getCoinBalance(coin, userToken).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
### Get paginated list of transactions for all currencies 
```javascript
const pagination = {
  page: 1,
  perPage: 20
}

celsius.getTransctionSummary(pagination, userToken).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
### Get paginated list of transactions for a single currency
```javascript
const coin = 'BTC'
const pagination = {
  page: 1,
  perPage: 20
}

celsius.getCoinTransactions(coin, pagination, userToken).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
### Get address of a wallet for a specific currency
```javascript
const coin = 'BTC'

celsius.getDeposit(coin, userToken).then((address) => {
    console.log(address)
})
.catch((error) => {
    console.log(error)
})
```
### Withdraw funds to an address:
```javascript
const coin = 'BTC'
const formFields = {
    address: DESTINATION_ADDRESS,
    amount: AMOUNT
}
const userSecret = USER_TOKEN

celsius.withdraw(coin, formFields, userToken).then((transactionId) => {
    console.log(transactionId)
})
.catch((error) => {
    console.log(error)
})
```
### Get status of a transaction:
```javascript
// transactionId is returned by the withdraw call

celsius.getTransactionStatus(transactionId, userToken).then((status) => {
    console.log(status)
})
.catch((error) => {
    console.log(error)
})
```
