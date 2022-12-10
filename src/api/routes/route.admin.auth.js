import { Router } from 'express';
import adminAuth from '../controllers/controller.admin.auth.js';
import Model from '../middlewares/middleware.model.js';
import Schema from '../../lib/schema/schema.admin.auth.js';
import adminMiddleware from '../middlewares/middleware.admin.auth.js';
import authMiddleware from '../middlewares/middleware.auth.js';

const adminAuthRoute = Router();

adminAuthRoute.post(
  '/login',
  Model(Schema.login, 'payload'),
  adminMiddleware.checkIfAdminEmailExists,
  adminMiddleware.verifyPassword,
  adminMiddleware.generateToken,
  adminAuth.adminLogin,
);

adminAuthRoute.post(
  '/forgot_password',
  Model(Schema.forgotPassword, 'payload'),
  adminMiddleware.checkIfAdminEmailExists,
  adminMiddleware.generateTokenForPasswordReset,
  adminAuth.forgotPassword,
);

adminAuthRoute.post(
  '/reset_password',
  Model(Schema.resetPassword, 'payload'),
  adminMiddleware.verifyResetToken,
  authMiddleware.hashPassword,
  adminAuth.resetPassword,
);

export default adminAuthRoute;
