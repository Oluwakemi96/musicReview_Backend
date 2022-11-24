import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authServices from '../../api/services/service.auth';
import config from '../../config';
import options from '../utils/jwt';

const passwordHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

const comparePassword = async (password, email_address) => {
  const user = await authServices.loginUser(email_address);
  const validPassword = bcrypt.compareSync(password, user.password);
  return validPassword;
};

const sessionToken = async (email_address) => {
  const user = await authServices.loginUser(email_address);
  // console.log(user);
  let token = jwt.sign({
    email_address: user.email_address,
    username: user.username,
    full_name: user.full_name,
  }, config.MUSIC_REVIEW_JWT_SECRET_KEY, options.MUSIC_REVIEW_JWT_SIGN_OPTIONS);
  return token;
};

export default {
  passwordHash,
  sessionToken,
  comparePassword,
};
