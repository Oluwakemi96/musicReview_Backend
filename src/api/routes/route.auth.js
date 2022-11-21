import { Router } from 'express';
import allSongs from '../controllers/auth.controller';

const authRoute = Router();
authRoute.get('/all_songs', allSongs);

export default authRoute;
