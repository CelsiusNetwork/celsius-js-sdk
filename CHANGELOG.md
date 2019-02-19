# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
