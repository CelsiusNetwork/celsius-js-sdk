![Institutional Partner Overview](/assets/images/institutional-partner.svg)
{% raw %}
<h1 style="display: none;">Institutional Partner</h1>
{% endraw %}

## Use case

The Institutional Partner API offers partners the ability to use Celsius features as a legal entity rather than as a user. This allows partners to reap the benefits and features of Celsius Network that to be accessed through the API rather than from a mobile app. 

### Features

- ***Deposits & withdrawals***
> Partners can deposit and withdraw any cryptocurrencies supported by Celsius to designated account to start earning interest.
- ***Balance & transaction checking***
> Partner can check their account balances and transaction statuses across different blockchains.

## Getting started

Please consult the [Postman docs](https://documenter.getpostman.com/view/4207695/Rzn6v2mZ#62562199-0dce-4fd8-b8e6-a3440fc60a7f) for the Institutional Partner API. 

### Security

1. Each partner will receive a **partner-token** and the **api-key** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Each request sent to the Celsius API is followed by the partner token and API key to successfully authenticate the partner.
3. Responses sent back from the Celsius API will be signed using Celsius Network's private key, and will automatically be verified on the SDK receiving end with the hardcoded public key. 

### Initializing the SDK

Initialize SDK in the following way:

```javascript
const { Celsius, AUTH_METHODS, ENVIRONMENT } = require('celsius-sdk')
const partnerKey = process.env.PARTNER_TOKEN // Should be kept secret
const apiKey = process.env.API_KEY // Should be kept secret, can be regenerated

Celsius({
    authMethod: AUTH_METHODS.API_KEY, // We are telling the SDK that we are authenticating using a combination of an API key and a Partner token
    partnerKey: partnerKey,
    environment: ENVIRONMENT.staging // If not present, default is production.
}).then((celsius) => {
  // your code
})

```
### Wallet actions

After initializing SDK, you can perform following actions:

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
celsius.getBalanceSummary(apiKey).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get balance for a single currency
```javascript
const coin = 'BTC'

celsius.getCoinBalance(coin, apiKey).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get total interest earned
```javascript
celsius.getInterestSummary(apiKey).then((interestSummary) => {
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

celsius.getTransctionSummary(pagination, apiKey).then((transactions) => {
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

celsius.getCoinTransactions(coin, pagination, apiKey).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
#### Get address of a wallet for a specific currency
```javascript
const coin = 'BTC'

celsius.getDeposit(coin, apiKey).then((address) => {
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
const userSecret = USER_TOKEN

celsius.withdraw(coin, formFields, apiKey).then((transactionId) => {
    console.log(transactionId)
})
.catch((error) => {
    console.log(error)
})
```
#### Get status of a transaction
```javascript
// transactionId is returned by the withdraw call

celsius.getTransactionStatus(transactionId, apiKey).then((status) => {
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
celsius.getStatistics(apiKey, '1552388292').then((statistics) => {
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
