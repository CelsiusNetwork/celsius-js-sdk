/**
 * @typedef {object} EnvironmentConfig
 * @property {string} baseUrl - Base url for the environment.
 * @property {string} publicKey - Public key used to verify signatures of responses.
 */

/**
 * Contains base configuration for different environments.
 * @property {EnvironmentConfig} staging - Staging configuration
 * @property {EnvironmentConfig} production - Production configuration
 * @type {object}
 */
const CONFIG = {
  staging: {
    baseUrl: 'https://wallet-api.staging.celsius.network',
    publicKey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4K0VBRkUvQVlUNnQ2UVBERWl0WApDc0FWenZSdFhQUzVaMS85c0JyUEpVSWF5UDZqbHZQRnFsWDFPdCtrcUZYWGtweUQ2V1Arak5nMmNiWlg3MXVDCkFKdThTMjhaTnk3U2N3ZTZiQnJkMllzdlBBM2VCWGtKU2QrTHc0MjhBZEIxQzAxYUs1R09tejJsQTZWTktHM3EKUXQyWWdmbTkwWURxcTZDV1h1ZUJWd05uUUdqQi9lMTdxOVdTTk41VG1QM0tBcWlFc0tMTHM2a1ljVHdDbjZYYwpnSWd2K3VXZUtmTnVMbDgzNUpGUUFMc2FBMm5lc0JPODRHbE45ZllxelhsWXFFMEc3bU1kUkRhZ2FSNlJQZXFPCktlQzVLbXdydUowajYvWWR5dGl2KzRqUFZCcTFIVm5kTzFvaFQ3d3cyeEVyZXpjeGdvM1JHd2dMNHJBUTRyU0MKWFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'
  },
  production: {
    baseUrl: 'https://wallet-api.celsius.network',
    publicKey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF3MklLcms5azV6aHlnZ091bWtQZQpsd2hlMkxkL1BGOHN6djdDQzFVTUdFMlc0Z2RBWk81b2VkbmVDQXZoSkZMdE1kRm9aNmpUdXBGOSsrUTZZSWZSCnR1Q0VTdlRLWmVhMmhESHVjbGlGbXVoZ1ZQVEppVHZCTWozSVhZajhQTmNyRWZaV1VaRzVKU2ZGZ1Q1ck1YMzAKc2dWbGJBcFJFOXdKY3FCMi9Jb1RsdTgwKzFQVXpMUnlPbFJQM2czMkwzT3dacTBHWGpXaUx5c01OMm81dHQyaApsNUNYQjRPVW5HMVBDbzBIY2hRd25NdXo1UHE1Wk9EYXhhNmVka01hNVNKS1p1Tzc0NDMzdnlVb3NWNXRXSkNpCmc1ZEhkNkJWbCtZS1lkUUgyenEwcDhJakUvblU0Rk9GY3N0NFU4WDJndlIyNU5hTzY2UHFYWWNhWnFYdUY5UE0KVndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=='
  }
}
module.exports = {
  CONFIG
}
