import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Crypto from 'crypto';
import config from '../../config';
import tokenExpires from '../utils/jwt';

const generateRandomString = (size) => {
  try {
    return Crypto.randomBytes(size).toString('hex');
  } catch (error) {
    console.log(error);
    return error;
  }
};

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.MUSIC_REVIEW_BCRYPT_SALT_ROUNDS));
  return hashedPassword;
};

const comparePassword = async (password, user) => {
  const validPassword = bcrypt.compareSync(password, user.password);
  return validPassword;
};

const compareAdminPassword = async (password, admin) => {
  const validPassword = bcrypt.compareSync(password, admin.password);
  return validPassword;
};

const sessionToken = async (user, type) => {
  const expTime = type === 'login' ? tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS : tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE;
  let token = jwt.sign({
    user_id: user.id,
    is_user: true,
  }, config.MUSIC_REVIEW_JWT_SECRET_KEY, expTime);
  return token;
};

const adminSessionToken = async (admin, type) => {
  const expTime = type === 'login' ? tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS : tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE;
  let token = jwt.sign({
    admin_id: admin.id,
    is_admin: true,
  }, config.MUSIC_REVIEW_JWT_SECRET_KEY, expTime);
  return token;
};

export default {
  hashPassword,
  sessionToken,
  comparePassword,
  compareAdminPassword,
  adminSessionToken,
  generateRandomString,
};
