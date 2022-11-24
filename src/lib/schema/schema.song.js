import Joi from 'joi';

const songsVal = Joi.object().keys({
  song_title: Joi.string().required(),
});

export default {
  songsVal,
};
