import pgPromise from "pg-promise";
import promise from 'bluebird';

const pg = pgPromise({ promiseLib: promise, noWarnings: true })
const db = pg(process.env.MUSIC_REVIEW_DATABASE_URL);

export { db };
