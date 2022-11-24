/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import tokenExpires from '../../lib/utils/jwt';
import config from '../../config/index';

// eslint-disable-next-line consistent-return
const verifyToken = async (req, res, next) => {
  const tokenExists = req.headers && req.headers.authorization;
  if (tokenExists) {
    const token = req.headers.authorization.split(' ')[1];
    // Verify token
    // console.log(token);
    jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_SIGN_OPTIONS, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized access.' });
      }
      req.user = decodedToken; // what is encoded in the token
      return next();
    });
  } else {
    return res.status(403).json({ message: 'Missing token' });
  }
};

const verifyResetToken = async (req, res, next) => {
  const tokenExists = req.body;
  if (!tokenExists) {
    return res.status(403).json({
      message: 'missing token',
    });
  }
  const { token } = req.body;
  jwt.verify(token, config.MUSIC_REVIEW_JWT_SECRET_KEY, tokenExpires.MUSIC_REVIEW_JWT_TOKEN_EXPIRE, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'unauthorized access.' });
    }
    req.user = decodedToken;
    return next();
  });
};
export default {
  verifyToken,
  verifyResetToken,
};
