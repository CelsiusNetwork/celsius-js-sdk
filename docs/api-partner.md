![API Partner Overview](/assets/images/api-partner.svg)

# Use case

Celsius API Partner partnership type is perfect for integrating existing Celsius Network users to third-party applications.

Using user-generated API Keys from within the Celsius Network mobile app, the partner application can interface the Celsius API on the behalf of the user. 

# Features

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

# Getting started

## Security

1. Partner receives a **partner-token** from Celsius Network that will be used to authenticate that partner on Celsius API.
2. Partner shows instructions to his users in their app, prompting them to generate API keys from the Celsius Network application and paste them to the partner application. Users must open a Celsius Network account with the official Celsius app and pass KYC to be able to generate API keys. 
3. Partner uses user generated API key to authenticate users on Celsius API and use Celsius features on their behalf.
