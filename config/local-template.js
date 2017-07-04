var sslEnabled = false;
var path = require('path');

module.exports = {

    IS_PRODUCTION: (process.env.NODE_ENV === 'production'),

    port: (process.env.PORT || 3000),

    domain: "http://localhost"
    
};