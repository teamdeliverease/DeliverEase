const Joi = require('@hapi/joi').extend(require('joi-phone-number'));
const validationMiddleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.assert(req[property], schema);
        if (error === null) { return next(); }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            console.error(message);
            return res.status(400).json({ error: message });
        }
    }
}

module.exports = validationMiddleware;