import Joi from 'joi';

const songsVal = Joi.object().keys({
  song_title: Joi.string().required(),
});

const songsGenre = Joi.object().keys({
  genre: Joi.string().required(),
});

const songDetails = Joi.object().keys({
  song_id: Joi.string().required(),
  review_id: Joi.string().required(),
});

const songRating = Joi.object().keys({
  rating: Joi.string().required(),
});

const songReview = Joi.object().keys({
  review: Joi.string().required(),
});

const songLikesReview = Joi.object().keys({
  song_id: Joi.number().required(),
  review_id: Joi.number().required(),
});

const songIdReview = Joi.object().keys({
  song_id: Joi.number().required(),
});

export default {
  songsVal,
  songsGenre,
  songDetails,
  songRating,
  songReview,
  songIdReview,
  songLikesReview,
};
