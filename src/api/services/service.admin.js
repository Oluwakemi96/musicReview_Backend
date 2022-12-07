import adminQueries from '../queries/query.admin';
import db from '../../config/db';

export const createRegularAdmin = async (first_name, last_name, email, password_token) => {
  const regularAdmin = await db.oneOrNone(adminQueries.createAdmin, [first_name, last_name, email, password_token]);
  return regularAdmin;
};

export const updateRegularAdmin = async (password, id) => {
  const updatedAdmin = await db.oneOrNone(adminQueries.updateRegularAdmin, [password, id]);
  return updatedAdmin;
};

export const getPasswordToken = async (id) => {
  const passwordToken = await db.oneOrNone(adminQueries.getPasswordToken, [id]);
  return passwordToken;
};

export const setAdminStatus = async (status, id) => {
  const updatedStatus = await db.oneOrNone(adminQueries.setAdminStatus, [status, id]);
  return updatedStatus;
};

export const getAdmins = async (id) => {
  const admins = await db.oneOrNone(adminQueries.getAdmins, [id]);
  return admins;
};

export const addSongs = async (song_title, year_of_release, genre, album_name, artist, song_link) => {
  const song = await db.oneOrNone(adminQueries.addSongs, [song_title, year_of_release, genre, album_name, artist, song_link]);
  return song;
};

export const deleteSongs = async (id) => {
  const song = await db.oneOrNone(adminQueries.deleteSong, [id]);
  return song;
};

export const editSongs = async (payload) => {
  const editedSong = await db.oneOrNone(adminQueries.editSong, [...payload]);
  return editedSong;
};

export const getSong = async (id) => {
  const song = await db.oneOrNone(adminQueries.getSong, [id]);
  return song;
};

export const getAllSongs = async () => {
  const songs = await db.any(adminQueries.getAllSongs);
  return songs;
};

export const getSongsByGenre = async (genre) => {
  const songs = await db.any(adminQueries.getSongsByGenre, [genre]);
  return songs;
};

export const getSongReviews = async (song_id) => {
  const reviews = await db.any(adminQueries.getUsersReviews, [song_id]);
  return reviews;
};

export const deleteReviews = async (user_id) => {
  const deletedReview = await db.oneOrNone(adminQueries.deleteReview, [user_id]);
  return deletedReview;
};

export const getAllAdmins = async () => {
  const admins = await db.any(adminQueries.getAllAdmins);
  return admins;
};

export const updateAdminStatus = async (status, admin_id) => {
  const updatedStatus = await db.oneOrNone(adminQueries.updateAdminStatus, [status, admin_id]);
  return updatedStatus;
};

export const updateUsersStatus = async (status, user_id) => {
  const updatedUser = await db.oneOrNone(adminQueries.setUsersStatus, [status, user_id]);
  return updatedUser;
};

export const getSongDetails = async (song_id) => {
  const songDetails = await db.oneOrNone(adminQueries.getSongDetails, [song_id]);
  return songDetails;
};

export const getReviewDetails = async (song_id) => {
  const reviewDetails = await db.any(adminQueries.getReviewDetails, [song_id]);
  return reviewDetails;
};
