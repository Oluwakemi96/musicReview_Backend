import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import tokenExpires from '../utils/jwt';

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.MUSIC_REVIEW_BCRYPT_SALT_ROUNDS));
  return hashedPassword;
};

const comparePassword = async (password, user) => {
  const validPassword = bcrypt.compareSync(password, user.password);
  return validPassword;
};

const sessionToken = async (user, type) => {
  const expTime = type === 'login' ? tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS : tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE;
  let token = jwt.sign({
    user_id: user.id,
  }, config.MUSIC_REVIEW_JWT_SECRET_KEY, expTime);
  return token;
};

export default {
  hashPassword,
  sessionToken,
  comparePassword,
};
