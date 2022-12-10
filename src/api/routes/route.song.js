import { Router } from 'express';
import songs from '../controllers/controller.song.js';
import Schema from '../../lib/schema/schema.song.js';
import Model from '../middlewares/middleware.model.js';
import authMiddleware from '../middlewares/middleware.auth.js';
import songMiddleware from '../middlewares/middleware.songs.js';

const songRoute = Router();
songRoute.get('/all', songs.allSongs);
songRoute.get(
  '/search',
  Model(Schema.songsVal, 'query'),
  songs.songByTitle,
);
songRoute.get(
  '/genre',
  Model(Schema.songsGenre, 'query'),
  songs.SongByGenre,
);
songRoute.get(
  '/details/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songId, 'params'),
  songMiddleware.checkIfSongIdExists,
  songs.getAllSongDetails,
);
songRoute.post(
  '/like/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songId, 'params'),
  songMiddleware.checkIfUserAlreadyLikedAsong,
  songMiddleware.checkIfSongIdExists,
  songMiddleware.removeAdislike,
  songs.likeAsong,
);
songRoute.post(
  '/dislike/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songId, 'params'),
  songMiddleware.checkIfUserAlreadyDislikedAsong,
  songMiddleware.checkIfSongIdExists,
  songMiddleware.removeALike,
  songs.dislikeAsong,
);
songRoute.post(
  '/rate/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songIdReview, 'params'),
  Model(Schema.songRating, 'payload'),
  songMiddleware.checkIfSongIdExists,
  songs.rateAsong,
);

songRoute.post(
  '/review/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songIdReview, 'params'),
  Model(Schema.songReview, 'payload'),
  songMiddleware.checkIfSongIdExists,
  songs.reviewSong,
);

songRoute.post(
  '/like_review/:song_id/:review_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songLikesReview, 'params'),
  songMiddleware.checkIfAuserAlreadyLikedAreview,
  songMiddleware.checkIfSongIdExists,
  songMiddleware.checkIfReviewIdExists,
  songs.likeReview,
);

songRoute.get(
  '/song_reviews/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songIdReview, 'params'),
  songMiddleware.checkIfSongIdExists,
  songs.getAsongReview,
);

songRoute.get(
  '/users_likes/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songIdReview, 'params'),
  songMiddleware.checkIfSongIdExists,
  songs.getUsersThatLikeAsong,
);

songRoute.get(
  '/users_dislikes/:song_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songIdReview, 'params'),
  songMiddleware.checkIfSongIdExists,
  songs.getUsersThatDislikeAsong,
);

songRoute.get(
  '/users_reviewLikes/:song_id/:review_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songLikesReview, 'params'),
  songMiddleware.checkIfSongIdExists,
  songMiddleware.checkIfReviewIdExists,
  songs.getUsersThatLikesAReview,
);

songRoute.delete(
  '/delete_review/:song_id/:review_id',
  authMiddleware.verifyToken,
  songMiddleware.checkUserCurrentStatus,
  Model(Schema.songLikesReview, 'params'),
  songMiddleware.checkIfAlikeForAreviewExist,
  songMiddleware.checkIfSongIdExists,
  songMiddleware.checkIfReviewIdExists,
  songs.deleteAuserReview,
);
export default songRoute;
