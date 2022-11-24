import db from '../../config/db/index.js';
import songQueries from '../queries/query.song';

export const fetchSongs = async () => {
  const songs = await db.any(songQueries.getAllSongs);
  return songs;
};

export const searchSongByTitle = async (song_title) => {
  const songs = await db.oneOrNone(songQueries.getSongByTitle, [`%${song_title}%`]);
  return songs;
};
