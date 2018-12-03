const PUBLIC_KEY = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4K0VBRkUvQVlUNnQ2UVBERWl0WApDc0FWenZSdFhQUzVaMS85c0JyUEpVSWF5UDZqbHZQRnFsWDFPdCtrcUZYWGtweUQ2V1Arak5nMmNiWlg3MXVDCkFKdThTMjhaTnk3U2N3ZTZiQnJkMllzdlBBM2VCWGtKU2QrTHc0MjhBZEIxQzAxYUs1R09tejJsQTZWTktHM3EKUXQyWWdmbTkwWURxcTZDV1h1ZUJWd05uUUdqQi9lMTdxOVdTTk41VG1QM0tBcWlFc0tMTHM2a1ljVHdDbjZYYwpnSWd2K3VXZUtmTnVMbDgzNUpGUUFMc2FBMm5lc0JPODRHbE45ZllxelhsWXFFMEc3bU1kUkRhZ2FSNlJQZXFPCktlQzVLbXdydUowajYvWWR5dGl2KzRqUFZCcTFIVm5kTzFvaFQ3d3cyeEVyZXpjeGdvM1JHd2dMNHJBUTRyU0MKWFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t";

const AUTH_METHODS = {
  API_KEY: "api-key",
  USER_TOKEN: "user-token"
};

const PATHS = {
  KYC: "/kyc",
  BALANCE_SUMMARY: "/wallet/balance",
  TRANSACTIONS_SUMMARY: '/wallet/transactions',
  COIN_BALANCE: (coin) => {
    return '/wallet/' + coin + '/balance'
  },
  COIN_TRANSACTIONS: (coin) => {
    return '/wallet/' + coin + '/transactions'
  },
  DEPOSIT: (coin) => {
    return '/wallet/' + coin + '/deposit'
  },
  WITHDRAW: (coin) => {
    return '/wallet/' + coin + '/withdraw'
  },
  TRANSACTION_STATUS: (transaction) => {
    return '/wallet/transactions/' + transaction + '/status'
  }
};

module.exports = {
  AUTH_METHODS,
  PATHS,
  PUBLIC_KEY
};
