![API Partner Overview](/assets/images/api-partner.svg)
{% raw %}
<h1 style="display: none;">API Partner</h1>
{% endraw %}

## Use case

Celsius API Partner partnership type is perfect for integrating existing Celsius Network users to third-party applications.

Using user-generated API Keys from within the Celsius Network mobile app, the partner application can interface the Celsius API on the behalf of the user. 

### Features

Partner can access only endpoints for which the user provided permissions during api-key creation.

Depending on what the user allowed for when creating the API key, following permissions can be granted:


- ***Read balance***
> Grants the partner the ability to retrieve user’s balance from Celsius API.
- ***Read transactions***
> Grants the partner the ability to retrieve a list of user’s previous transactions and balance
- ***Get deposit address*** 
> Grants the partner the ability to read the address of the user’s wallet for a specified currency, to which user can deposit.
- ***Withdraw***
> Grants partner the ability to withdraw funds from user’s wallet to another address.

## Getting started

Please consult the [Postman docs](https://documenter.getpostman.com/view/4207695/Rzn6v2mZ#83677182-2cc9-4198-b574-77ad0862237b) for the API Partner. 

### Security

1. Partners receive a **partner-token** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Partner shows instructions to his users in their app, prompting them to generate API keys from the Celsius Network application and paste them to the partner application. Users must open a Celsius Network account with the official Celsius app and pass KYC to be able to generate API keys. 
3. Partner uses user generated API key to authenticate users on Celsius API and use Celsius features on their behalf.
4. Responses sent back from the Celsius API will be signed using Celsius Network's private key, and will be automatically verified on the SDK receiving end with the hardcoded public key. 

### Initializing the SDK

Initialize SDK in the following way:

```javascript
const { Celsius, AUTH_METHODS, ENVIRONMENT } = require('celsius-sdk')
const partnerKey = process.env.PARTNER_TOKEN // Should be kept secret

const celsius = Celsius({
    authMethod: AUTH_METHODS.API_KEY, // We are telling the SDK that we are authenticating using a combination of different user API keys and a Partner token
    partnerKey: partnerKey,
    environment: ENVIRONMENT.staging // If not present, default is production.
})

```
### Wallet actions

After initializing SDK, you can perform following actions:

> `user.celsiusApiKey` is the API key that the user entered into your application on whose behalf you are using Celsius API.

#### Get balance for all currencies
```javascript
celsius.getBalanceSummary(user.celsiusApiKey).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get balance for a single currency
```javascript
const coin = 'BTC'

celsius.getCoinBalance(coin, user.celsiusApiKey).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get paginated list of transactions for all currencies 
```javascript
const pagination = {
  page: 1,
  perPage: 20
}

celsius.getTransctionSummary(pagination, user.celsiusApiKey).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
#### Get paginated list of transactions for a single currency
```javascript
const coin = 'BTC'
const pagination = {
  page: 1,
  perPage: 20
}

celsius.getCoinTransactions(coin, pagination, user.celsiusApiKey).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
#### Get address of a wallet for a specific currency
```javascript
const coin = 'BTC'

celsius.getDeposit(coin, user.celsiusApiKey).then((address) => {
    console.log(address)
})
.catch((error) => {
    console.log(error)
})
```
#### Withdraw funds to an address
```javascript
const coin = 'BTC'
const formFields = {
    address: DESTINATION_ADDRESS,
    amount: AMOUNT
}

celsius.withdraw(coin, formFields, user.celsiusApiKey).then((transactionId) => {
    console.log(transactionId)
})
.catch((error) => {
    console.log(error)
})
```
#### Get status of a transaction

> `transactionId` is returned by the withdraw call and is used for monitoring the status of that transaction on the blockchain.
```javascript
celsius.getTransactionStatus(transactionId, user.celsiusApiKey).then((status) => {
    console.log(status)
})
.catch((error) => {
    console.log(error)
})
```
