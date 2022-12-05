import { Router } from 'express';
import Model from '../middlewares/middleware.model';
import * as Schema from '../../lib/schema/schema.admin';
import admin from '../controllers/controller.admin';
import authAdminMiddleware from '../middlewares/middleware.admin.auth';
import adminMiddleware from '../middlewares/middlewares.admin';
import authMiddleware from '../middlewares/middleware.auth';

const adminRoute = Router();

adminRoute.post(
  '/create_admin',
  authAdminMiddleware.verifyToken,
  Model(Schema.createAdmin, 'payload'),
  adminMiddleware.generateRandomStringToken,
  admin.createAdmin,
);

adminRoute.post(
  '/create_admin_password/:id',
  Model(Schema.updateAdmin, 'payload'),
  Model(Schema.updateAdminId, 'params'),
  adminMiddleware.checkPasswordToken,
  authMiddleware.hashPassword,
  admin.updateAdmin,

);

adminRoute.post(
  '/admin_status/:id',
  authAdminMiddleware.verifyToken,
  Model(Schema.updateAdminStatus, 'payload'),
  Model(Schema.updateAdminId, 'params'),
  adminMiddleware.checkIfAdminIsRegular,
  admin.updateAminStatus,

);

adminRoute.post(
  '/add_songs',
  authAdminMiddleware.verifyToken,
  Model(Schema.addSongs, 'payload'),
  admin.addSongs,
);

adminRoute.delete(
  '/delete_song/:song_id',
  authAdminMiddleware.verifyToken,
  Model(Schema.deleteSong, 'params'),
  admin.deleteSongs,
);

export default adminRoute;
