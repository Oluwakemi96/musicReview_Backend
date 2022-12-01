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
  '/details',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.checkIfIdExists,
  songs.songDetails,
);
songRoute.post(
  '/like',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.getSongId,
  songMiddleware.checkIfUserAlreadyLikedAsong,
  songMiddleware.removeAdislike,
  songs.likeAsong,
);
songRoute.post(
  '/dislike',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.getSongId,
  songMiddleware.checkIfUserAlreadyDislikedAsong,
  songMiddleware.removeALike,
  songs.dislikeAsong,
);
songRoute.post(
  '/rate',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  Model(Schema.songRating, 'payload'),
  songMiddleware.getSongId,
  // songMiddleware.checkIfUserAlreadyRatedASong,
  songs.rateAsong,
);

songRoute.post(
  '/review',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  Model(Schema.songReview, 'payload'),
  songMiddleware.getSongId,
  songs.reviewSong,
);

songRoute.post(
  '/like_review',
  authMiddleware.verifyToken,
  songMiddleware.getReviewId,
  songMiddleware.checkIfAuserAlreadyLikedAreview,
  songs.likeReview,
);

songRoute.get(
  '/song_reviews',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.getSongId,
  songs.getAsongReview,
);

songRoute.get(
  '/users_likes',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.getSongId,
  songMiddleware.checkIfLikesExists,
  songs.getUsersThatLikeAsong,
);

songRoute.get(
  '/users_dislikes',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.getSongId,
  songMiddleware.checkIfDislikesExists,
  songs.getUsersThatDislikeAsong,
);
export default songRoute;
