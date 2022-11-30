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
// songRoute.post(
//   '/update_rating',
//   authMiddleware.verifyToken,
//   songMiddleware.getSongId,
//   Model(Schema.songRating, 'payload'),
//   songMiddleware.checkIfAratingExist,
//   songs.updateArating,

// );

export default songRoute;
