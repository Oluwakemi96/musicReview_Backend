import 'dotenv/config';

const {
    MUSIC_REVIEW_NODE_ENV,
    MUSIC_REVIEW_PORT,
    MUSIC_REVIEW_PROD_DATABASE_URL,
} = process.env;

export default {
    MUSIC_REVIEW_NODE_ENV,
    MUSIC_REVIEW_PORT,
    MUSIC_REVIEW_DATABASE_URL: MUSIC_REVIEW_PROD_DATABASE_URL,
};
