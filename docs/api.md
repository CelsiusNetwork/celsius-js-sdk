![API Partner Overview](/assets/images/api-partner.svg)
{% raw %}
<h1 style="display: none;">API Partner</h1>
{% endraw %}

## Use case

Celsius API Partner partnership type is ideal for integrating existing Celsius Network users to third-party applications.

Using our user-generated API Keys from within the Celsius Network mobile app, the partner application can interface the Celsius API on the behalf of the user. 

### Features

Partner can access only endpoints for which the user provides permissions during API key creation.

Depending on what the user permissions granted when the API key is created, following actions can be granted:


- ***Read balance***
> Grants a partner the ability to retrieve user’s balance from Celsius API.
- ***Read transactions***
> Grants a partner the ability to retrieve a list of user’s previous transactions and balances.
- ***Get deposit address*** 
> Grants a partner the ability to read the wallet address of the given user for a specified currency, in which the user can deposit.
- ***Withdraw***
> Grants partner the ability to withdraw funds from user’s wallet to another wallet address.

[Click here to view how to generate API Key.](/createAPIKey.html) 

## Getting started

Please consult the [Postman docs](https://documenter.getpostman.com/view/4207695/Rzn6v2mZ#83677182-2cc9-4198-b574-77ad0862237b) for the API Partner. 

### Security

1. Partners receive a **partner-token** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Partner shows instructions to his users in their app, prompting them to generate API keys from the Celsius Network application and paste them to the partner application. Users must open a Celsius Network account with the official Celsius app and pass KYC to be able to generate API keys. 
3. Partner uses the user-generated API key to authenticate users on Celsius API and use Celsius features on their behalf.
4. Responses sent back from the Celsius API will be signed using Celsius Network's private key, and will be automatically verified on the SDK receiving end with the hardcoded public key. 

### Initializing the SDK

Initialize SDK in the following way:

```javascript
const { Celsius, AUTH_METHODS, ENVIRONMENT } = require('celsius-sdk')
const partnerKey = process.env.PARTNER_TOKEN // Should be kept secret

Celsius({
    authMethod: AUTH_METHODS.API_KEY, // We are telling the SDK that we are authenticating using a combination of different user API keys and a Partner token
    partnerKey: partnerKey,
    environment: ENVIRONMENT.staging // If not present, default is production.
}).then((celsius) => {
  // your code
})

```
### Wallet actions

After initializing SDK, you can perform following actions:

> `user.celsiusApiKey` is the API key that the user entered into your application on whose behalf you are using Celsius API.

#### Refresh currently supported currencies
```javascript
celsius.getSupportedCurrencies().then((currencies) => {
  console.log(currencies) // or console.log(celsius.currencies)
}).catch((error) => {
  console.log(error)
})
```

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
#### Get total interest earned by user
```javascript
celsius.getInterestSummary(user.celsiusApiKey).then((interestSummary) => {
    console.log(interestSummary)
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
#### Get interest rates for all supported coin
```javascript
celsius.getInterestRates().then((interestRates) => {
   console.log(interestRates);
 }).catch((error) => {
   console.log(error);
 })
```

### Statistics actions

After initializing SDK, you can perform following actions:

#### Get statistics for user
```javascript
celsius.getStatistics(user.celsiusApiKey, '1552388292').then((statistics) => {
   console.log(statistics);
 }).catch((error) => {
   console.log(error);
 })
```

### Obtaining coins for testing

| Coin name     | Coin Type | Faucet    |
| ------------- | ----------| --------- |
| Bitcoin       | TBTC      | [https://bitcoinfaucet.uo1.net/](https://bitcoinfaucet.uo1.net/) | 
| Bitcoin Cash  | TBCH      | [https://developer.bitcoin.com/faucets/bch/](https://developer.bitcoin.com/faucets/bch/) | 
| Bitcoin Gold  | TBTG      | [https://test-faucet.bitcoingold.org/](https://test-faucet.bitcoingold.org/) |
| Ethereum      | TETH      | [https://faucet.kovan.network/](https://faucet.kovan.network/) |
| Litecoin      | TLTC      | [http://testnet.litecointools.com/](http://testnet.litecointools.com/) |