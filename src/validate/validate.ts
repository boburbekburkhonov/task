import Joi from "joi";

export const validationSignUp = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required()
})