//VALIDATION
const Joi = require('@hapi/joi')


//REGISTER VALIDATION
const registerValidation = (user) => {
    const schema = {
        name: Joi.string()
            .min(4)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(user, schema);
};

//LOGIN VALIDATION
const loginValidation = (user) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };
    return Joi.validate(user, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;