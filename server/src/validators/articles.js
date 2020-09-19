const Joi = require("@hapi/joi");


const articleValidation = data => {
    const schema = Joi.object({
        title: Joi.string() .min(10) .required(),
        content: Joi.string() .min(50) .required(),
    });
    return schema.validate(data);
};

module.exports.articleValidation = articleValidation;