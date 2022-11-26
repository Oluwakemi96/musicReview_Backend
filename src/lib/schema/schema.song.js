import Joi from 'joi';

const songsVal = Joi.object().keys({
  song_title: Joi.string().required(),
});

const songsGenre = Joi.object().keys({
  genre: Joi.string().required(),
});

const songDetails = Joi.object().keys({
  id: Joi.string().required(),
});

export default {
  songsVal,
  songsGenre,
  songDetails,
};
