import { Router } from 'express';
import songs from '../controllers/controller.song';
import Schema from '../../lib/schema/schema.song';
import Model from '../middlewares/middleware.model';

const songRoute = Router();
songRoute.get('/all', songs.allSongs);
songRoute.get('/search', Model(Schema.songsVal, 'query'), songs.songByTitle);
songRoute.get('/genre', Model(Schema.songsGenre, 'query'), songs.SongByGenre);

export default songRoute;
