import Joi from 'joi';

export const blogValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(10).required(),
    content: Joi.string().min(20).required(),
    image: Joi.string()
      .optional()
      .pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        'link',
      ),
    imageId: Joi.string().optional(),
  });
  return schema.validate(data);
};

export const blogUpdateValidation = (data) => {
  const schema = Joi.object({
    title: joi.string().min(10),
    body: joi.string().min(20),
    imageId: joi.string(),
    image: joi
      .string()
      .pattern(
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
        'link',
      ),
  });
  return schema.validate(data);
};
