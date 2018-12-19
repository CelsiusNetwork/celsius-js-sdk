![Whitelabel Partner Overview](/assets/images/whitelabel.svg)

# Use case

The Whitelabel API offers partners a way to transparently give their existing users access to Celsius Network features. 

The partner can use the Celsius Network on behalf of their existing or new users, regardless of whether those users are already a part of the Celsius Network, as users created through the Whitelabel partner API will be completely independent from the Celsius Network application users.

# Features

- ***KYC Checking***
> Partner must perform KYC checks through Celsius for the users to be able to deposit.
- ***Deposits & withdrawals***
> Partner's users can do deposits and withdrawals of cryptocurrencies to the Celsius account to start earning interest.
- ***Balance & tranaction checking***
> Partner's users can check their account balances and transaction statuses on different blockchains.

# Getting started

## Security

1. Partner receives a **partner-token** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Each request Partner sends for his user must be accompanied by a unique **user-token** for that user. User token is used to differentiate different partner's users on the Celsius API.
3. Each response sent back from the Celsius API will be signed using Celsius Network's private key, and will be automatically verified on the SDK receiving end with the hardcoded public key. 
