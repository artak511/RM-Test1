const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    perPage: {
        in: ['query'],
        isNumeric: true,
        default: 25
    },
    page: {
        in: ['query'],
        isNumeric: true,
        default: 1
    },
    search: {
        in: ['query'],
        isString: true
    },
    ipAddress: {
        optional: true,
        isIP: true
    },
    name: {
        optional: true,
        isString: true
    },
    tags: {
        optional: true,
        isString: true,
        customSanitizer: {
            options(tags) {
                return tags.replaceAll(' ', '').split(',');
            }
        }
    }
});
