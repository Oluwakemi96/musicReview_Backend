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

export const searchSongByGenre = async (genre) => {
  const songs = await db.oneOrNone(songQueries.getSongByGenre, [genre]);
  return songs;
};

export const getAllDetails = async (id) => {
  const details = await db.oneOrNone(songQueries.getSongDetails, [id]);
  return details;
};

export const getAllSongIds = async (id) => {
  const ids = await db.oneOrNone(songQueries.getSongIds, [id]);
  return ids;
};

export const likeSongs = async (user_id, song_id) => {
  const like = await db.oneOrNone(songQueries.likeSongs, [user_id, song_id]);
  return like;
};

export const getSongUserId = async (user_id, song_id) => {
  const userIds = await db.oneOrNone(songQueries.getUserIds, [user_id, song_id]);
  return userIds;
};

export const dislikeSongs = async (user_id, song_id) => {
  const dislikes = await db.oneOrNone(songQueries.dislikeSongs, [user_id, song_id]);
  return dislikes;
};

export const geUserDislikeId = async (user_id, song_id) => {
  const userDislikeId = await db.oneOrNone(songQueries.getUserDislikeId, [user_id, song_id]);
  return userDislikeId;
};

export const deleteAsongLike = async (user_id) => {
  const deletedLike = await db.oneOrNone(songQueries.deleteAsongLike, [user_id]);
  return deletedLike;
};

export const deleteAsongDislike = async (user_id) => {
  const deletedDislike = await db.oneOrNone(songQueries.deleteAsongDislike, [user_id]);
  return deletedDislike;
};

export const rateAsong = async (user_id, song_id, rating) => {
  const ratedSong = await db.oneOrNone(songQueries.rateAsong, [user_id, song_id, rating]);
  return ratedSong;
};

export const getAratedSong = async (user_id, song_id) => {
  const ratedSong = await db.oneOrNone(songQueries.getUserRating, [user_id, song_id]);
  return ratedSong;
};

export const updateArating = async (rating, user_id, song_id) => {
  const updatedRating = await db.oneOrNone(songQueries.editAuserRating, [rating, user_id, song_id]);
  return updatedRating;
};
