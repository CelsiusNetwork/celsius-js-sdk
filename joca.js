const { AUTH_METHODS, Celsius, ENVIRONMENT } = require('./index');
const baseUrl = 'http://localhost:4000'
const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF4K0VBRkUvQVlUNnQ2UVBERWl0WApDc0FWenZSdFhQUzVaMS85c0JyUEpVSWF5UDZqbHZQRnFsWDFPdCtrcUZYWGtweUQ2V1Arak5nMmNiWlg3MXVDCkFKdThTMjhaTnk3U2N3ZTZiQnJkMllzdlBBM2VCWGtKU2QrTHc0MjhBZEIxQzAxYUs1R09tejJsQTZWTktHM3EKUXQyWWdmbTkwWURxcTZDV1h1ZUJWd05uUUdqQi9lMTdxOVdTTk41VG1QM0tBcWlFc0tMTHM2a1ljVHdDbjZYYwpnSWd2K3VXZUtmTnVMbDgzNUpGUUFMc2FBMm5lc0JPODRHbE45ZllxelhsWXFFMEc3bU1kUkRhZ2FSNlJQZXFPCktlQzVLbXdydUowajYvWWR5dGl2KzRqUFZCcTFIVm5kTzFvaFQ3d3cyeEVyZXpjeGdvM1JHd2dMNHJBUTRyU0MKWFFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t'

async function f() {
  const a = await Celsius({
    partnerKey: '1111111', // unesi svoj iz baze
    environment: ENVIRONMENT.STAGING,
    baseUrl,
    publicKey,
    authMethod: AUTH_METHODS.USER_TOKEN
  });

  const users = await a.getUsers({}, 'asd');
  console.log(users.users.results[0])

  let userMetadata = {asd:'asdasdsa'};
  const user = await a.changeMetadata('28453e75-1696-41d6-b7ef-94b3a1208ff0', { g: '1111111'}, 'a');

  const address = await a.changeWithdrawalAddress('28453e75-1696-41d6-b7ef-94b3a1208ff0', {short: 'btc', address: 'adasdasd'}, 'asdfas');
  console.log(address)

}

f()