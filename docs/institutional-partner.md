![Institutional Partner Overview](/assets/images/institutional-partner.svg)

# Institutional Partner

## Overview

The institutional partnership offer partners the ability to use Celsius Network features as a legal entity rather then as a user.

## Getting started

1. Partner and Celsius Network become partners
2. Partner receives a **partner-token** that will be used to authenticate that partner on Celsius API
3. Partner creates a **user-token** for themselves which is then used to authenticate them on Celsius API
4. Each request sent to the Celsius API is followed by the partner and user tokens (authenticating the partner).

## 

##Initializing SDK

Initialize SDK in the following way:

```
const { Celsius, AUTH_METHODS, ENVIRONMENT } = require('index')
const partnerKey = PARTNER_TOKEN

const celsius = Celsius({
    authMethod: AUTH_METHODS.USER_TOKEN,
    partnerKey: partnerKey,
    environment: ENVIRONMENT.staging // If not present, default is production.
})

```
## Using SDK

After initializing SDK, partner can perform following actions:

#### Get balance for all currencies
```
const userSecret = USER_TOKEN

celsius.getBalanceSummary(userSecret).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get balance for a single currency
```
const coin = 'BTC'
const userSecret = USER_TOKEN

celsius.getCoinBalance(coin, userSecret).then((balanceSummary) => {
    console.log(balanceSummary)
})
.catch((error) => {
    console.log(error)
})
```
#### Get paginated list of transactions for all currencies 
```
const pagination = {
  page: 1,
  perPage: 20
}
const userSecret = USER_TOKEN

celsius.getTransctionSummary(pagination, userSecret).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
#### Get paginated list of transactions for a single currency
```
const coin = 'BTC'
const pagination = {
  page: 1,
  perPage: 20
}
const userSecret = USER_TOKEN

celsius.getCoinTransactions(coin, pagination, userSecret).then((transactions) => {
    console.log(transactions)
})
.catch((error) => {
    console.log(error)
})
```
#### Get address of a wallet for a currency
```
const coin = 'BTC'
const userSecret = USER_TOKEN

celsius.getDeposit(coin, userSecret).then((address) => {
    console.log(address)
})
.catch((error) => {
    console.log(error)
})
```
#### Withdraw funds to an address
```
const coin = 'BTC'
const formFields = {
    address: DESTINATION_ADDRESS,
    amount: AMOUNT
}
const userSecret = USER_TOKEN

celsius.withdraw(coin, formFields, userSecret).then((transactionId) => {
    console.log(transactionId)
})
.catch((error) => {
    console.log(error)
})
```
#### Get status of a transaction
```
const transaction = TRANSACTION_ID
const userSecret = USER_TOKEN

celsius.getTransactionStatus(transaction, userSecret).then((status) => {
    console.log(status)
})
.catch((error) => {
    console.log(error)
})
```

