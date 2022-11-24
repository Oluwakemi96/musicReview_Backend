import { Router } from 'express';
import authUsers from '../controllers/controller.auth';
import Model from '../middlewares/middleware.model';
import Schema from '../../lib/schema/schema.auth';
import token from '../middlewares/middleware.auth';

const authRoute = Router();
authRoute.post('/sign_up', Model(Schema.signUp, 'payload'), authUsers.registerUser);
authRoute.post('/login', Model(Schema.login, 'payload'), authUsers.login);
authRoute.get('/details', Model(Schema.songDetails, 'query'), token.verifyToken, authUsers.songDetails);
authRoute.post('/forgot_password', Model(Schema.forgotPassword, 'payload'), authUsers.forgotPassword);
authRoute.post('/reset_password', Model(Schema.resetPassword, 'payload'), token.verifyResetToken, authUsers.resetPassword);

export default authRoute;
