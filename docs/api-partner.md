![API Partner Overview](/assets/images/api-partner.svg)

**Api-key partner**

User creates an api-key in Celsius app which he then uses to authorize partner’s application to interact with Celsius on their behalf (they don’t get a separate account).
Partner can access only endpoints for which the user provided permissions during api-key creation.

**Getting started**

1. Partner contacts Celsius to become api-key partner.
2. Celsius creates account for the partner and provides them with a partner token that will be used to authenticate that partner on Celsius API.
3. Partner’s users create an account (or use an existing one) through the Celsius App.
4. Users submit data for KYC (if they haven’t already passed KYC) on Celsius App.
5. Upon successfully passing KYC, users create api-key with appropriate permissions in Celsius App.
6. Users provide partner with the created api-keys.
7. Partner uses those api-keys to authenticate users on Celsius API.
	
_Api-Keys can have the following permissions:_
- `Read balance` - Grants partner the ability to retrieve user’s balance from our api.
- `Read transactions` - Grants partner the ability to retrieve a list of user’s previous transactions.
- `Get deposit address` - Grants partner the ability to read address of the user’s wallet for a specified currency.
- `Withdraw` - Grants partner the ability to withdraw funds from user’s wallet to another address.