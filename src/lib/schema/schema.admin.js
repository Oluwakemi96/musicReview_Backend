import Joi from 'joi';

export const createAdmin = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const updateAdmin = Joi.object().keys({
  password: Joi.string().required(),
  password_token: Joi.string().required(),
});

export const updateAdminId = Joi.object().keys({
  id: Joi.string().required(),
});

export const updateAdminStatus = Joi.object().keys({
  status: Joi.string().required(),
});

export const addSongs = Joi.object().keys({
  song_title: Joi.string().required(),
  year_of_release: Joi.number().required(),
  genre: Joi.string().required(),
  album_name: Joi.string().required(),
  artist: Joi.string().required(),
  song_link: Joi.string().required(),
});

export const deleteSong = Joi.object().keys({
  song_id: Joi.number().required(),
});
