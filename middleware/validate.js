
const Joi = require("joi");

module.exports = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const messages = error.details.map(err => err.message);
            return res.status(400).json({ errors: messages});
        }

        req.validatedBody = value;
        next();
    };
};