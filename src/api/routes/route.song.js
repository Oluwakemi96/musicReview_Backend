import { Router } from 'express';
import songs from '../controllers/controller.song';
import Schema from '../../lib/schema/schema.song';
import Model from '../middlewares/middleware.model';
import authMiddleware from '../middlewares/middleware.auth';
import songMiddleware from '../middlewares/middleware.songs';

const songRoute = Router();
songRoute.get('/all', songs.allSongs);
songRoute.get('/search', Model(Schema.songsVal, 'query'), songs.songByTitle);
songRoute.get('/genre', Model(Schema.songsGenre, 'query'), songs.SongByGenre);
songRoute.get(
  '/details',
  authMiddleware.verifyToken,
  Model(Schema.songDetails, 'query'),
  songMiddleware.checkIfIdExists,
  songs.songDetails,
);

export default songRoute;
