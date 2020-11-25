/** @enum {string} */
const ERROR_MESSAGES = {
  INVALID_AUTH_METHOD: 'Invalid authentication method provided.',
  RESPONSE_VERIFICATION_FAILED: 'Response signature verification failed.',
  INVALID_PARTNER_KEY: 'Partner key can not be null.',
  NO_PUBLIC_KEY: 'No public key provided.',
  NO_SIGNATURE_PROVIDED: 'No signature was provided for verification.'
}

module.exports = {
  ERROR_MESSAGES
}
