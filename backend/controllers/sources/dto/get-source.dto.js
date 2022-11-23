const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  id: {
    in: ['params'],
    isNumeric: true
  },
  ipAddress: {
    optional: true,
    isIP: true
  },
  name: {
    optional: true,
    isString: true
  }
});