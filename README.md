[![NPM](https://nodei.co/npm/celsius-sdk.svg?compact=true)](https://nodei.co/npm/celsius-sdk/)

[![CircleCI](https://circleci.com/gh/CelsiusNetwork/celsius-js-sdk/tree/master.svg?style=svg)](https://circleci.com/gh/CelsiusNetwork/celsius-js-sdk/tree/master)

The official Celsius Network SDK for JavaScript, currently available for Node.js backends.

For release notes, see the [CHANGELOG](https://github.com/CelsiusNetwork/celsius-js-sdk/blob/master/CHANGELOG.md).

# Installation

For use on Node.js backends, you can install the Celsius SDK by running the following NPM command:

```
npm install celsius-sdk --save
```

or if using yarn

```
yarn add celsius-sdk
```

# Documentation

For using the SDK and Celsius API please consult the [Celsius Developer Docs](http://developers.celsius.network).

# Contributing

## Reporting bugs

Bugs are reported to the [GitHub Issues Page](https://github.com/CelsiusNetwork/celsius-js-sdk/issues).

## Development

Prerequisites:
- `yarn` installed
- `node 8.x` or later installed

Branching strategy: [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html).

Steps:
1. Develop your feature in the `feature/<feature-name>` branch.
2. Create a pull request from your branch to the `develop`.
3. Once accepted, your feature will go live in the next release.