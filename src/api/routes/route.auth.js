import { Router } from 'express';
import authUsers from '../controllers/controller.auth.js';
import Model from '../middlewares/middleware.model.js';
import Schema from '../../lib/schema/schema.auth.js';
import authMiddleware from '../middlewares/middleware.auth.js';

const authRoute = Router();
authRoute.post(
  '/sign_up',
  Model(Schema.signUp, 'payload'),
  authMiddleware.checkIfEmailExists,
  authMiddleware.checkIfUsernameExists,
  authMiddleware.hashPassword,
  authMiddleware.generateRandomStringToken,
  authUsers.registerUser,
);
authRoute.post(
  '/user_verification',
  Model(Schema.userStatus, 'payload'),
  authMiddleware.compareUserVerificationToken,
  authUsers.updateUserStatus,
);
authRoute.post(
  '/login',
  Model(Schema.login, 'payload'),
  authMiddleware.checkIfEmailExistsForLogin,
  authMiddleware.verifyPassword,
  authMiddleware.generateToken,
  authMiddleware.checkUserStatus,
  authUsers.login,
);
authRoute.post(
  '/forgot_password',
  authMiddleware.checkIfEmailExistsForLogin,
  authMiddleware.generateToken,
  Model(Schema.forgotPassword, 'payload'),
  authUsers.forgotPassword,
);
authRoute.post(
  '/reset_password',
  Model(Schema.resetPassword, 'payload'),
  authMiddleware.verifyResetToken,
  authMiddleware.hashPassword,
  authUsers.resetPassword,
);

export default authRoute;
