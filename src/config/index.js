import { devEnv, prodEnv, testEnv } from './env/index.js';

const { MUSIC_REVIEW_NODE_ENV } = process.env

const config = MUSIC_REVIEW_NODE_ENV === 'development' ? devEnv : 
    MUSIC_REVIEW_NODE_ENV === 'production' ? prodEnv : 
    testEnv;

export default config;
