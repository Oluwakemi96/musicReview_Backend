/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import tokenExpires from '../../lib/utils/jwt';
import Response from '../../lib/http/lib.http.response';
import hash from '../../lib/hash/hash.auth';
import * as adminAuthServices from '../services/service.admin.auth';
import config from '../../config/index';

// eslint-disable-next-line consistent-return
const verifyToken = async (req, res, next) => {
  try {
    const tokenExists = req.headers && req.headers.authorization;
    if (tokenExists) {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS, async (err, decodedToken) => {
        if (err) {
          return Response.error(res, 'unauthorized access', 401);
        }
        const admin = await adminAuthServices.getAdminDetailsById(decodedToken.admin_id);
        delete admin.password;
        req.admin = admin;
        return next();
      });
    } else {
      return Response.error(res, 'missing token', 411);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfAdminEmailExists = async (req, res, next) => {
  let { email } = req.body;
  try {
    const email_address = await adminAuthServices.getAdminEmail(email);
    if (!email_address) {
      return Response.error(res, 'the email you entered is invalid, please enter a valid mail', 402);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const verifyPassword = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const admin = await adminAuthServices.getAdminDetailsByEmail(email);
    const verifiedPassword = await hash.compareAdminPassword(password, admin);
    if (!verifiedPassword) {
      return Response.error(res, 'incorrect password', 422);
    }
    delete admin.password;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const generateToken = async (req, res, next) => {
  let { email } = req.body;
  try {
    const admin = await adminAuthServices.getAdminDetailsByEmail(email);
    const token = await hash.adminSessionToken(admin, 'login');
    req.token = token;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};
const generateTokenForPasswordReset = async (req, res, next) => {
  let { email } = req.body;
  try {
    const admin = await adminAuthServices.getAdminDetailsByEmail(email);
    const token = await hash.adminSessionToken(admin, 'reset');
    req.token = token;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const verifyResetToken = async (req, res, next) => {
  try {
    let { token } = req.body;
    if (token) {
      jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE, async (err, decodedToken) => {
        if (err) {
          return Response.error(res, 'unauthorized access', 401);
        }
        const admin = await adminAuthServices.getAdminDetailsById(decodedToken.admin_id);
        delete admin.password;
        req.admin = admin;
        return next();
      });
    } else {
      return Response.error(res, 'missing token', 411);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  verifyToken,
  checkIfAdminEmailExists,
  verifyPassword,
  verifyResetToken,
  generateToken,
  generateTokenForPasswordReset,
};
