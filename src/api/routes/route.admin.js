import { Router } from 'express';
import Model from '../middlewares/middleware.model.js';
import * as Schema from '../../lib/schema/schema.admin.js';
import admin from '../controllers/controller.admin.js';
import authAdminMiddleware from '../middlewares/middleware.admin.auth.js';
import adminMiddleware from '../middlewares/middlewares.admin.js';
import authMiddleware from '../middlewares/middleware.auth.js';

const adminRoute = Router();

adminRoute.post(
  '/create_admin',
  authAdminMiddleware.verifyToken,
  adminMiddleware.getsuperAdmin,
  Model(Schema.createAdmin, 'payload'),
  adminMiddleware.generateRandomStringToken,
  admin.createAdmin,
);

adminRoute.post(
  '/create_admin_password',
  Model(Schema.updateAdmin, 'payload'),
  adminMiddleware.checkPasswordToken,
  authMiddleware.hashPassword,
  admin.updateAdminPassword,

);

adminRoute.post(
  '/add_songs',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.addSongs, 'payload'),
  admin.addSongs,
);

adminRoute.delete(
  '/delete_song/:song_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.deleteSong, 'params'),
  admin.deleteSongs,
);

adminRoute.put(
  '/edit_song/:song_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.editSongId, 'params'),
  Model(Schema.editSong, 'payload'),
  admin.editSongs,
);

adminRoute.get(
  '/all_songs',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  admin.getAllSongs,
);

adminRoute.get(
  '/song_genre',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.songGenre, 'query'),
  admin.getSongsByGenre,
);

adminRoute.get(
  '/reviews/:song_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.songReviewId, 'params'),
  admin.getSongReviews,
);

adminRoute.delete(
  '/delete_review/:user_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.reviewUserId, 'params'),
  admin.deleteUserReview,
);

adminRoute.patch(
  '/deactivate_admin/:admin_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.getsuperAdmin,
  Model(Schema.adminStatusId, 'params'),
  Model(Schema.adminStatus, 'payload'),
  admin.deactivateAdmin,
);
adminRoute.patch(
  '/reactivate_admin/:admin_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.getsuperAdmin,
  Model(Schema.adminStatusId, 'params'),
  Model(Schema.adminStatus, 'payload'),
  admin.reactivateAdmin,
);
adminRoute.patch(
  '/suspend_admin/:admin_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.getsuperAdmin,
  Model(Schema.adminStatusId, 'params'),
  Model(Schema.adminStatus, 'payload'),
  admin.suspendAdmin,
);

adminRoute.patch(
  '/deactivate_user/:user_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.userStatusId, 'params'),
  Model(Schema.userStatus, 'payload'),
  admin.deactivateUser,
);
adminRoute.patch(
  '/suspend_user/:user_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.userStatusId, 'params'),
  Model(Schema.userStatus, 'payload'),
  admin.deactivateUser,
);
adminRoute.patch(
  '/reactivate_user/:user_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.userStatusId, 'params'),
  Model(Schema.userStatus, 'payload'),
  admin.deactivateUser,
);

adminRoute.get(
  '/song_details/:song_id',
  authAdminMiddleware.verifyToken,
  adminMiddleware.checkAdminStatus,
  Model(Schema.songDetailsId, 'params'),
  admin.getAllSongDetails,
);

export default adminRoute;
