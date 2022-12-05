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

export const editSongs = async (song_title, year_of_release, genre, album_name, artist, song_link, id) => {
  const editedSong = await db.oneOrNone(adminQueries.editSong, [song_title, year_of_release, genre, album_name, artist, song_link, id]);
  return editedSong;
};
