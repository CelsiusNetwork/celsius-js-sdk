# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2022-03-08
### Added 
- Functionalities: 
  - Added functionality to `http-client` for sending PUT requests. Kudos to [@ptlls](https://github.com/ptlls)
- Methods:
  - ```CelsiusInstance.getSupportedCountries(userSecret)``` that returns the list of countries supported by Celsius. 
  - ```CelsiusInstance.health(message)``` checks the health of the server. Kudos to [@andreujuanc](https://github.com/andreujuanc)
  - ```CelsiusInstance.getKycVerificationStatus(userId, userSecret)``` checks the KYC status, similar to existing `getKycStatus` method, but takes also `userId` as a parameter
   and returns a response containing property `status` which shows the status of KYC and `reason` which states the reason for the status if needed.
  - ```CelsiusInstance.startKycVerification(userId, documentType, userDocuments, userSecret)``` starts the KYC verification same as existing `verifyKyc` method, but it doesn't 
   create the user, but rather receives an existing user's id - `userId` as a parameter
  - ```CelsiusInstance.createUser(user)``` which returns `userId` which can be used to manipulate user info and starting KYC verification. Also, the `user_token` property will be used as `userSecret`
  - ```CelsiusInstance.updateUser(userId, user, userSecret)``` 
  - ```CelsiusInstance.updateUserEmail(email, userSecret)```
  - ```CelsiusInstance.confirmTermsOfUse(termsOfUseId, confirmationDate, userSecret)``` use to accept the latest terms of use. Kudos to [@ptlls](https://github.com/ptlls)
- Types:
  - `CreateUser` with properties `first_name`, `last_name`, `middle_name`?, `email`?, `title`?, `date_of_birth`,
    `citizenship`, `country`, `state`?, `city`, `zip`, `street`, `building_number`?, `flat_number`, `itin`?, national_id?,
    `ssn`?, `gender`, `user_token`
  - `UpdateUser` with properties `first_name`, `last_name`, `middle_name`?, `email`?,`title`?, `date_of_birth`,
    `citizenship`,`country`,`state`?,`city`,`zip`, `street`,`building_number`?,`flat_number`?,`itin`?,
    `national_id`?, `ssn`?, `gender`,
  - `UpdateEmail` with `email` property, for updating user email.
  - `CreateUserResponse` with properties `userId`, `userToken`
  - `SupportedCountriesResponse` with properties `alpha2`, `alpha3`, `countryCallingCodes`, `currencies`
    `emoji`, `ioc`, `languages`, `name` and `status`
  - `KYCStatusResponse` with properties `status` and `reasons`
### Updated
- Updated methods:
  - `getInterestRates` return type changed to `Promise<InterestRates[]>` . Kudos to [@barathvk](https://github.com/barathvk)
  - `getTransactionSummary`, pagination options parameter changed from `PaginationOptions` to `CelsiusPaginationOptions`. Kudos to [@crypto-diplodocus](https://github.com/crypto-diplodocus) and [@rbayliss](https://github.com/rbayliss)
  - `getCoinTransactions`, pagination options changed from `PaginationOptions` to `CelsiusPaginationOptions`. Kudos to [@crypto-diplodocus](https://github.com/crypto-diplodocus) and [@rbayliss](https://github.com/rbayliss)
- Updated types:
  - added `coin` property to `CelsiusWithdrawOptions`
- Updated dependencies:
  - Bump `nokogiri` from 1.10.8 to 1.12.5
  - Bump `path-parse` from 1.0.6 to 1.0.7
  - Bump `addressable` from 2.5.2 to 2.8.0
  - Bump `hosted-git-info` from 2.7.1 to 2.8.9
  - Bump `lodash` from 4.17.19 to 4.17.21
  - Bump `axios` from 0.18.1 to 0.21.1
### Deleted: 
- Deleted methods:
  - ```CelsiusInstance.createUser```
  - ```CelsiusInstance.getUsers```
  - ```CelsiusInstance.changeMetadata```
  - ```CelsiusInstance.changeWithdrawalAddress```
- Deleted types:
  - `PaginationOptions`
  - `UserWithdrawalAddress`
  - `UserMetadataResponse` 
  - `UserCreateResponse`
  - `UsersResponse` 
  - `WithdrawalAddress` 
  - `InstitutionalUser`

## [0.10.15] - 2020-12-23
- Adding a new property `amount_precise` to the `CelsiusTransactionRecord` type. It provides the exact transaction amount, without any rounding applied.
- Fixing typos in jsdoc. Kudos to [@saginadir](https://github.com/saginadir) who noticed the typo and contributed code that fixes it!

## [0.10.14] - 2020-11-25
- Fixing error handling to cover unhandled cases such as Wallet API being offline and signature verification failing.
- Adding a new class `CelsiusSDKError` that encapsulates errors raised within the Celsius SDK. This class extends the Error class and contains the following additional attributes:
    - slug - Unique identifier tied to the error, returned by the API;
    - status - Status code returned by the API;
    - originalError - Original error which was used to instantiate CelsiusSDKError.
- Exporting `CelsiusSDKError` and `ValidationError` classes used by Celsius SDK to encapsulate errors.
- Fixing unhandled promise rejections in http-client.js::post method. Kudos to [@vigan-abd](https://github.com/vigan-abd) who noticed the issue and provided the code to fix it!

## [0.10.13] - 2020-07-21
- Adding new properties to response received when using ```CelsiusInstance.getTransctionSummary(pagination, userSecret)``` and ```CelsiusInstance.getCoinTransactions(coin, pagination, userSecret)```.
    * original_interest_coin - Name of the original coin for which the interest has been accrued.
    * interest_amount_in_original_coin - Amount accrued in `original_interest_coin`, before conversion to another asset. 
  
  These properties are present only for transactions where the `nature` property is `interest`.

## [0.10.12] - 2020-01-24
- Adding support for `Origin address of the first deposit` withdrawal scheme.
    * Whitelabel partners can now be configured in a way that allows withdrawing funds only to the origin addresses of first deposits.
    * Adding method ```CelsiusInstance.getWithdrawalAddresses(userSecret)``` which returns all withdrawal addresses for the given user.
    * Adding method ```CelsiusInstance.getWithdrawalAddressForCoin(coin, userSecret)``` which returns withdrawal address for the given user and coin.

## [0.10.11] - 2019-12-18
- Raising axios version from 0.18.0 up to 0.18.1 to address security vulnerabilities.

## [0.10.9] - 2019-03-12
### Added
-   Added method ```CelsiusInstance.getStatistics(userSecret, timestamp)``` that returns following statistics:
    * deposit_count - Number of deposits made
    * deposit_amount - Total amount deposited in usd and per coin (in that coin and usd)
    * withdrawal_count - Number of withdrawals made
    * withdrawal_amount - Total amount withdrawn in usd and per coin (in that coin and usd)
    * interest_count - Number of interests earned
    * interest_amount - Total interest earned in usd and per coin (in that coin and usd)
    
    Optionally, ```timestamp``` can be provided which serves as the starting point for gathering statistics.
    Any deposits, withdrawals and interests created before that date will be ignored.
-   Added mocha tests to sdk.

## [0.10.8] - 2019-02-25
### Added
-   Added support for ISO 3166 country representation in ```CelsiusKycUserData.country``` property.
    Available ISO 3166 country representations are:
    * ISO 3166 Country name
    * ISO 3166 Official state name
    * ISO 3166-1 Alpha-2 code
    * ISO 3166-3 Alpha-3 code
    
## [0.10.7] - 2019-02-20
### Added
-   Added support for two letter United States state codes in ```CelsiusKycUserData.state``` property.
### Bug Fixes
-   Fixed typings for ```CelsiusKycUserData.document_type```. Available document types are now:
    * passport
    * identity_card
    * driving_licence
## [0.10.6] - 2019-02-19
### Added
-   Added following address properties to ```CelsiusKycUserData```:
    * country
    * state - Required if the country is 'United States'
    * city
    * zip
    * street
    * building_number
    * flat_number
    
-   Added following taxpayer properties to ```CelsiusKycUserData```:
    * itin
    * national_id
    * ssn
    
-   Changed maximum upload size to 25mb

## [0.10.5] - 2019-02-14
### Added
-   Method ```CelsiusInstance.getInterestSummary(userSecret)``` that returns interest earned by the user.

## [0.10.4] - 2019-02-13
### Added
- `ValidationError` for all http-client 4xx responses.

## [0.10.2] - 2019-02-08
### Added
-   Method ```CelsiusInstance.getInterestRates()``` will return interest rate for all supported coins.

## [0.10.1] - 2019-02-06
### Added
-   Method ```CelsiusInstance.createUser()``` will create new user for whitelabel partner.

## [0.10.0] - 2019-02-05
### Added
-   Method ```CelsiusInstance.getUsers()``` will return all users for whitelabel partner.
-   Method ```CelsiusInstance.changeMetadata()``` will change metadata of the user.
-   Method ```CelsiusInstance.changeWithdrawalAddress()``` will change withdrawal address of the user.

## [0.9.5] - 2019-01-03
### Added
-   Typescript type definitions! Kudos to [@jmbrito01](https://github.com/jmbrito01) who typed out most of the definitions, and helped us greatly!
-   Supported currencies are now retrieved upon instantiation of the SDK and can be accessed via ```CelsiusInstance.currencies``` property.
-   Method ```CelsiusInstance.getSupportedCurrencies()``` refreshes ```CelsiusInstance.currencies``` property and returns currencies.

## [0.9.4] - 2018-12-17
### Added
- 🚢🍾  First open-source version of the Celsius SDK released! Kudos to [@JovanovicJovan](https://github.com/JovanovicJovan) & [@g4ndr4](https://github.com/g4ndr4). Great job guys!
