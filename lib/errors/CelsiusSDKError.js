/**
 * Class which encapsulates errors returned by the Wallet API through the Celsius SDK.
 * @extends Error
 */
class CelsiusSDKError extends Error {
  /**
   * Create a CelsiusSDKError.
   *
   * @param {string} message
   * @param {string | null} [slug = null] - Unique identifier used by Wallet API to identify different errors. Is null if the error occurred within the SDK itself.
   * @param {number | null} [statusCode = null] - Status code returned by the Wallet API. Is null if the error occurred within the SDK itself.
   * @param {Error | null} [originalError = null] - Original error that was thrown
   */
  constructor (message = 'Oops, something went wrong!', slug = null, statusCode = null, originalError = null) {
    super(message)

    this.slug = slug
    this.status = statusCode
    this.originalError = originalError
  }
}

module.exports = {
  CelsiusSDKError
}
