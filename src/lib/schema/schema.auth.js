import Joi from 'joi';

const signUp = Joi.object().keys({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email_address: Joi.string().email().required(),
});

const login = Joi.object().keys({
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object().keys({
  email_address: Joi.string().email().required(),
});

const resetPassword = Joi.object().keys({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export default {
  signUp,
  login,
  forgotPassword,
  resetPassword,
};
