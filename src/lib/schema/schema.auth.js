import Joi from 'joi';

const signUp = Joi.object().keys({
  full_name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email_address: Joi.string().required(),
});

const login = Joi.object().keys({
  email_address: Joi.string().required(),
  password: Joi.string().required(),
});

const songDetails = Joi.object().keys({
  song_title: Joi.string().required(),
});

const forgotPassword = Joi.object().keys({
  email_address: Joi.string().required(),
});

const resetPassword = Joi.object().keys({
  password: Joi.string().required(),
  token: Joi.string().required(),
});

export default {
  signUp,
  login,
  songDetails,
  forgotPassword,
  resetPassword,
};
