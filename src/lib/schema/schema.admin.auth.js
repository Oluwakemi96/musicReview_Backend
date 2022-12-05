import Joi from 'joi';

const login = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object().keys({
  email: Joi.string().email().required(),
});

const resetPassword = Joi.object().keys({
  password: Joi.string().required(),
  token: Joi.string().required(),

});
export default {
  login,
  forgotPassword,
  resetPassword,
};
