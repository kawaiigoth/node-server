const nconf = require('nconf'),
    path = require('path');

nconf.argv().env();

nconf.file('./lib/config.json');

module.exports = nconf;