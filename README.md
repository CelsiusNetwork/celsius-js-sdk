# Node Celsius API
This project is designed to help you make your own projects that interact with the Celsius API.

#### Installation
```
npm install celsius-api --save
```

#### Getting started
```javascript
const { Celsius } = require("celsius");

const routes = Celsius({
  authMethod = '<auth-method>',
  partnerKey = '<patner>',
  userSecret = '<user-secret>'
});
```

#### Get KYC status
```js
let status = await routes.getKycStatus();
console.log(status);
```

<details>
 <summary>View Response</summary>

```js
{ status: 'COLLECTING' }
```
```js
{ status: 'PENDING' }
```
```js
{ status: 'PASSED' }
```
```js
{ status: 'REJECTED' }
```
</details>

#### Get KYC status
```js
const userData = {
  first_name: 'Satoshi',
  last_name: 'Nakamoto',
  date_of_birth: '1990-04-14',
  citizenship: 'Serbia',
  middle_name: '',
  title: '',
  gender: 'male',
  phone_number: '+38169241423',
  document_type: 'passport',
};

const files = {
  document_front_image: '<path>',
  document_back_image: '<path>'
};

const verifyKYC = await routes.verifyKyc(userData, files);
console.log(verifyKYC);
```

<details>
 <summary>View Response</summary>

```js
{ message: 'KYC already passed.' }
```
```js
{ message: 'Kyc started.' }
```
```js
{ message: 'KYC already started.' }
```
</details>

#### Getting list of current balances
```javascript
const balance = await routes.getBalanceSummary();
console.log(balance)
```
<details>
 <summary>View Response</summary>

```js
{
   ETH: 0,
   BTC: '12',
   BCH: 0,
   LTC: 0,
   XRP: 0,
   XLM: 0,
   OMG: 0,
   CEL: 0
}
```
</details>

#### Get balance for coin
```javascript
const balance = await routes.getCoinBalance('BTC');
console.log(balance);
```
<details>
 <summary>View Response</summary>

```js
{ amount: '12.00000000', amount_in_usd: '77916.274569' }
```
</details>



#### Get transacion summary
```javascript
const transactions = await routes.getTransacionSummary({
  page: 1,
  perPage: 20
});

console.log(transactions);
```
<details>
 <summary>View Response</summary>

```js
{
  pagination: { total: 1, pages: 1, current: 1, per_page: 20, showing: '1 - 1' },
  record:
   [
     {
	   amount: '12.00000000',
       amount_usd: null,
       coin: 'BTC',
       state: 'confirmed',
       nature: 'deposit',
       time: '2018-11-02T11:34:13.307Z',
       txId: null
     }
   ]
}

```
</details>

#### Get coin transactions
```javascript
const transactions = await routes.getCoinTransactions('BTC', {
  page: 1,
  perPage: 20
});

console.log(transactions);
```
<details>
 <summary>View Response</summary>

```js
{
  pagination: { total: 1, pages: 1, current: 1, per_page: 20, showing: '1 - 1' },
  record:
   [
     {
	   amount: '12.00000000',
       amount_usd: null,
       coin: 'BTC',
       state: 'confirmed',
       nature: 'deposit',
       time: '2018-11-02T11:34:13.307Z',
       txId: null
     }
   ]
}
```
</details>

####  Get deposit address
```javascript
const depositAddress = await routes.getDeposit('BTC');
console.log(depositAddress);
```

<details>
 <summary>View Response</summary>

```
{ address: '2MucRNb8Uk5X75HydeShkuywCPmgeHNiVwD' }
```

</details>

####  Withdraw
```javascript
const coin = 'BTC';
const amount = 0.01;
const address = '2N9afLpGvkrMhdQKYjjm8vvMSc4CJfBABib';
const formFields = {
  amount,
  address
};

const transactionId = await routes.withdraw(coin, formFields);
console.log(transactionId);
```

<details>
 <summary>View Response</summary>

```
{ transaction_id: '09d0c0ae-2db3-4aca-9d37-106b93bbe892' }
```

</details>