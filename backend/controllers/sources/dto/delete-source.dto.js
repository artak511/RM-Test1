const { checkSchema } = require('express-validator');

module.exports = checkSchema({
  id: {
    in: ['params'],
    isNumeric: true
  }
});
