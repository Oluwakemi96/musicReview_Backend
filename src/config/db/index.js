import pgPromise from 'pg-promise';
import promise from 'bluebird';
import config from '../index.js';

const pg = pgPromise({ promiseLib: promise, noWarnings: true });
const db = pg(config.MUSIC_REVIEW_DATABASE_URL);

export default db;
