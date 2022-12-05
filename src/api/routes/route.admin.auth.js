import { Router } from 'express';
import adminAuth from '../controllers/controller.admin.auth';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/schema.admin.auth';
import adminMiddleware from '../middlewares/middleware.admin.auth';
import authMiddleware from '../middlewares/middleware.auth';

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
