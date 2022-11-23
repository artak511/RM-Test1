const { checkSchema } = require('express-validator');
const sources = require('../sources.store');

module.exports = checkSchema({
  id: {
    in: ['params'],
    isNumeric: true
  },
  ipAddress: {
    optional: true,
    in: ['body'],
    isIP: true,
    errorMessage: 'Invalid IP address',
    custom: {
      if(ipAddress) {
        const source = sources.find(source => source.ipAddress === ipAddress);
        
        return !!source;
      },
      errorMessage: 'IP address already registered'
    }
  },
  name: {
    optional: true,
    isString: true,
  },
  'credentials.domain': {
    optional: true,
    in: ['body'],
    isString: true,
  },
  'credentials.username': {
    optional: true,
    in: ['body'],
    isString: true,
  },
  'credentials.password': {
    optional: true,
    in: ['body'],
    isString: true,
  },
  tags: {
    optional: true,
    in: ['body']
  }
});
