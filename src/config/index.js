import { devEnv, prodEnv, testEnv } from '../config/env';

const { MUSIC_REVIEW_NODE_ENV } = process.env

export default {
    development: devEnv,
    production: prodEnv,
    test: testEnv,
}[MUSIC_REVIEW_NODE_ENV || 'development'];
