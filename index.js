const { Celsius } = require("./lib/core");
let config = {};

config.authMethod = 'user-token';
config.partnerKey = '';
config.userSecret = 'd41d8cd98f00b204e9800998ecf8427e';

let routes = Celsius(config);
