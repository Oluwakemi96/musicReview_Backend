import { Router } from 'express';
import songs from '../controllers/controller.song';
import Schema from '../../lib/schema/schema.song';
import Model from '../middlewares/middleware.model';
import authMiddleware from '../middlewares/middleware.auth';
import songMiddleware from '../middlewares/middleware.songs';

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
  '/details/:id',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'params'),
  songMiddleware.checkIfIdExists,
  songs.songDetails,
);
songRoute.post(
  '/like/:id',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'params'),
  songMiddleware.getSongId,
  songMiddleware.checkIfUserAlreadyLikedAsong,
  songMiddleware.removeAdislike,
  songs.likeAsong,
);
songRoute.post(
  '/dislike/:id',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'params'),
  songMiddleware.getSongId,
  songMiddleware.checkIfUserAlreadyDislikedAsong,
  songMiddleware.removeALike,
  songs.dislikeAsong,
);
songRoute.post(
  '/rate/:song_id',
  authMiddleware.verifyToken,
  Model(Schema.songIdReview, 'params'),
  Model(Schema.songRating, 'payload'),
  songs.rateAsong,
);

songRoute.post(
  '/review/:song_id',
  authMiddleware.verifyToken,
  Model(Schema.songIdReview, 'params'),
  Model(Schema.songReview, 'payload'),
  songs.reviewSong,
);

songRoute.post(
  '/like_review/:song_id/:review_id',
  authMiddleware.verifyToken,
  Model(Schema.songLikesReview, 'params'),
  songMiddleware.checkIfAuserAlreadyLikedAreview,
  songs.likeReview,
);

songRoute.get(
  '/song_reviews/:song_id',
  authMiddleware.verifyToken,
  Model(Schema.songIdReview, 'params'),
  songs.getAsongReview,
);

songRoute.get(
  '/users_likes/:song_id',
  authMiddleware.verifyToken,
  Model(Schema.songIdReview, 'params'),
  songs.getUsersThatLikeAsong,
);

songRoute.get(
  '/users_dislikes/:song_id',
  authMiddleware.verifyToken,
  Model(Schema.songIdReview, 'params'),
  songs.getUsersThatDislikeAsong,
);

songRoute.get(
  '/users_reviewLikes/:song_id/:review_id',
  authMiddleware.verifyToken,
  Model(Schema.songLikesReview, 'params'),
  songs.getUsersThatLikesAReview,
);

songRoute.delete(
  '/delete_review/:song_id/:review_id',
  authMiddleware.verifyToken,
  Model(Schema.songLikesReview, 'params'),
  songMiddleware.checkIfAlikeForAreviewExist,
  songs.deleteAuserReview,
);
export default songRoute;
