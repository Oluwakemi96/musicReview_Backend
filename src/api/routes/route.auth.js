import { Router } from 'express';
import authUsers from '../controllers/controller.auth';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/schema.auth';
import authMiddleware from '../middlewares/middleware.auth';

const authRoute = Router();
authRoute.post(
  '/sign_up',
  Model(Schema.signUp, 'payload'),
  authMiddleware.checkIfEmailExists,
  authMiddleware.checkIfUsernameExists,
  authMiddleware.hashPassword,
  authUsers.registerUser,
);
authRoute.post(
  '/login',
  Model(Schema.login, 'payload'),
  authMiddleware.checkIfEmailExistsForLogin,
  authMiddleware.verifyPassword,
  authMiddleware.generateToken,
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
