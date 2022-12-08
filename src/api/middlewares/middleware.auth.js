/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import tokenExpires from '../../lib/utils/jwt';
import config from '../../config/index';
import * as authServices from '../services/service.auth';
import Response from '../../lib/http/lib.http.response';
import hash from '../../lib/hash/hash.auth';

// eslint-disable-next-line consistent-return
/**
 * verifies users token
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const verifyToken = async (req, res, next) => {
  try {
    const tokenExists = req.headers && req.headers.authorization;
    if (tokenExists) {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS, async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized access.' });
        }
        if (!decodedToken.is_user) {
          return Response.error(res, 'Access denied, contact support', 403);
        }
        const user = await authServices.getUserById(decodedToken.user_id);
        delete user.password;
        req.user = user;
        return next();
      });
    } else {
      return res.status(401).json({ message: 'Missing token' });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * verifies the token for reset password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const verifyResetToken = async (req, res, next) => {
  const tokenExists = req.body;
  try {
    if (!tokenExists) {
      return res.status(411).json({
        message: 'missing token',
      });
    }
    const { token } = req.body;
    jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'unauthorized access.' });
      }
      const user = await authServices.getUserById(decodedToken.user_id);
      delete user.password;
      req.user = user;
      return next();
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks if the email entered already exists
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const checkIfEmailExists = async (req, res, next) => {
  try {
    const { email_address } = req.body;
    const existingEmail = await authServices.userEmail(email_address.trim().toLowerCase());
    if (existingEmail) {
      return Response.error(res, 'email already exist', 400);
    }
    return next();
  } catch (error) {
    return error;
  }
};
/**
 * checks if the email entered is valid
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const checkIfEmailExistsForLogin = async (req, res, next) => {
  try {
    const { email_address } = req.body;
    const existingEmail = await authServices.userEmail(email_address.trim().toLowerCase());
    if (!existingEmail) {
      return Response.error(res, 'email does not exist on our database, please login with a valid email', 404);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * checks if the username entered is valid
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const checkIfUsernameExists = async (req, res, next) => {
  try {
    const { username } = req.body;
    const existingUsername = await authServices.usernameCheck(username.trim().toLowerCase());
    if (existingUsername) {
      return Response.error(res, 'username already exist', 403);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * hashes users password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = hash.hashPassword(password.trim());
    req.hashedPassword = hashedPassword;
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * verifies the password entered
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const verifyPassword = async (req, res, next) => {
  try {
    const { email_address, password } = req.body;
    const user = await authServices.getUserByEmail(email_address);
    const verifiedPassword = await hash.comparePassword(password, user);
    if (!verifiedPassword) {
      return Response.error(res, 'incorrect password', 422);
    }
    delete user.password;
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * generates a JWT token for a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const generateToken = async (req, res, next) => {
  try {
    let { email_address } = req.body;
    const user = await authServices.getUserByEmail(email_address);
    const token = await hash.sessionToken(user, 'login');
    req.token = token;
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * generates a random string token for a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const generateRandomStringToken = async (req, res, next) => {
  try {
    const userToken = await hash.generateRandomString(50);
    req.userToken = userToken;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * compares the verification token entered
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const compareUserVerificationToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { user_id } = req.params;
    const user = await authServices.getUserById(user_id);
    console.log(user);
    if (token !== user.password_token) {
      return Response.error(res, 'email verification failed', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks the status of the user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthMiddleware
 */
const checkUserStatus = async (req, res, next) => {
  try {
    const { email_address } = req.body;
    const user = await authServices.getUserByEmail(email_address);
    if (user.status === 'inactive' && user.email_address === email_address) {
      return Response.error(res, 'kindly verify your email address to login', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

export default {
  verifyToken,
  verifyResetToken,
  checkIfEmailExists,
  checkIfUsernameExists,
  checkIfEmailExistsForLogin,
  hashPassword,
  verifyPassword,
  generateToken,
  generateRandomStringToken,
  compareUserVerificationToken,
  checkUserStatus,
};
