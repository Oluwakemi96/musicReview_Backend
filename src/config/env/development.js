import 'dotenv/config';

const {
  MUSIC_REVIEW_NODE_ENV,
  MUSIC_REVIEW_PORT,
  MUSIC_REVIEW_DEV_DATABASE_URL,
  MUSIC_REVIEW_DEV_MAIL_USERNAME,
  MUSIC_REVIEW_DEV_MAIL_PASSWORD,
  MUSIC_REVIEW_DEV_OAUTH_CLIENTID,
  MUSIC_REVIEW_DEV_OAUTH_CLIENT_SECRET,
  MUSIC_REVIEW_DEV_OAUTH_REFRESH_TOKEN,
  MUSIC_REVIEW_DEV_JWT_SECRET_KEY,
  MUSIC_REVIEW_DEV_BCRYPT_SALT_ROUNDS,
} = process.env;

export default {
  MUSIC_REVIEW_NODE_ENV,
  MUSIC_REVIEW_PORT,
  MUSIC_REVIEW_DATABASE_URL: MUSIC_REVIEW_DEV_DATABASE_URL,
  MUSIC_REVIEW_MAIL_USERNAME: MUSIC_REVIEW_DEV_MAIL_USERNAME,
  MUSIC_REVIEW_MAIL_PASSWORD: MUSIC_REVIEW_DEV_MAIL_PASSWORD,
  MUSIC_REVIEW_OAUTH_CLIENTID: MUSIC_REVIEW_DEV_OAUTH_CLIENTID,
  MUSIC_REVIEW_OAUTH_CLIENT_SECRET: MUSIC_REVIEW_DEV_OAUTH_CLIENT_SECRET,
  MUSIC_REVIEW_OAUTH_REFRESH_TOKEN: MUSIC_REVIEW_DEV_OAUTH_REFRESH_TOKEN,
  MUSIC_REVIEW_JWT_SECRET_KEY: MUSIC_REVIEW_DEV_JWT_SECRET_KEY,
  MUSIC_REVIEW_BCRYPT_SALT_ROUNDS: MUSIC_REVIEW_DEV_BCRYPT_SALT_ROUNDS,
};
