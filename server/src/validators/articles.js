import Joi from "@hapi/joi";

export const articleValidation = data => {
    const schema = Joi.object({
        title: Joi.string() .min(10) .required(),
        content: Joi.string() .min(50) .required(),
    });
    return schema.validate(data);
};
