const {checkSchema} = require('express-validator');
const sources = require('../sources.store');

module.exports = checkSchema({
  ipAddress: {
    in: ['body'],
    custom: {
      if(ipAddress) {
        const source = sources.find(source => source.ipAddress === ipAddress);

        return !!source;
      },
      errorMessage: 'IP address already registered'
    }
  },
  name: {
    isString: true,
  },
  'credentials.domain': {
    in: ['body'],
    optional: true,
    isString: true,
  },
  'credentials.username': {
    in: ['body'],
    isString: true,
  },
  'credentials.password': {
    in: ['body'],
    isString: true,
  },
  tags: {
    optional: true,
    in: ['body']
  }
});
