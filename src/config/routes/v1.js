import { Router } from 'express';
import songRoute from '../../api/routes/route.song.js';
import authRoute from '../../api/routes/route.auth.js';
import adminAuthRoute from '../../api/routes/route.admin.auth.js';
import adminRoute from '../../api/routes/route.admin.js';

const router = Router();

router.use('/song', songRoute);
router.use('/auth', authRoute);
router.use('/admin/Auth', adminAuthRoute);
router.use('/admin', adminRoute);

export default router;
