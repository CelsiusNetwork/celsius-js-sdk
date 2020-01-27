# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
