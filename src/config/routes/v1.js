import { Router } from 'express';
import authRoute from '../../api/routes/route.auth.js';

const router = Router();

router.use('/auth', authRoute);

export default router;
