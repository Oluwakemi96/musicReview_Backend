import { Router } from 'express';
import songRoute from '../../api/routes/route.song.js';
import authRoute from '../../api/routes/route.auth.js';

const router = Router();

router.use('/song', songRoute);
router.use('/auth', authRoute);

export default router;
