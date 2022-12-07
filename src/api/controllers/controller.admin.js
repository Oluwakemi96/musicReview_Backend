import * as adminServices from '../services/service.admin';
import Response from '../../lib/http/lib.http.response';
import mails from '../../lib/utils/sendMails';

const createAdmin = async (req, res) => {
  try {
    let {
      first_name, last_name, email, password_token,
    } = req.body;
    let { adminToken } = req;
    password_token = adminToken;
    const adminLink = `http://music_review/admin?token=${password_token}`;
    const admin = await adminServices.createRegularAdmin(first_name, last_name, email.trim().toLowerCase(), password_token);
    mails.updateAdmin(email, adminLink);
    delete admin.password;
    return Response.success(res, 'admin created successfully', 200, admin);
  } catch (error) {
    return error;
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { hashedPassword } = req;
    const { id } = req.params;
    const updatedAdmin = await adminServices.updateRegularAdmin(hashedPassword, id);
    delete updatedAdmin.password;
    return Response.success(res, 'admin updated successfully', 200, updatedAdmin);
  } catch (error) {
    return error;
  }
};

const updateAdminStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedAdmin = await adminServices.setAdminStatus(status, id);
    return Response.success(res, 'status updated successfully', 200, updatedAdmin);
  } catch (error) {
    return error;
  }
};

const addSongs = async (req, res) => {
  try {
    const {
      song_title, year_of_release, genre, album_name, artist, song_link,
    } = req.body;
    const songs = await adminServices.addSongs(song_title, year_of_release, genre, album_name, artist, song_link);
    return Response.success(res, 'song added successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

const deleteSongs = async (req, res) => {
  try {
    const { song_id } = req.params;
    await adminServices.deleteSongs(song_id);
    return Response.success(res, 'song deleted successfully', 200);
  } catch (error) {
    return error;
  }
};

const editSongs = async (req, res) => {
  try {
    let { body, params: { song_id } } = req;
    const song = await adminServices.getSong(song_id);
    const payload = [
      body.song_title || song.song_title,
      body.year_of_release || song.year_of_release,
      body.genre || song.genre,
      body.album_name || song.album_name,
      body.artist || song.artist,
      body.song_link || song.song_link,
      song_id,
    ];
    const updatedSong = await adminServices.editSongs(payload);
    return Response.success(res, 'song updated successfully', 200, updatedSong);
  } catch (error) {
    return error;
  }
};

const getAllSongs = async (req, res) => {
  try {
    const songs = await adminServices.getAllSongs();
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

const getSongsByGenre = async (req, res) => {
  try {
    let { genre } = req.query;
    const songs = await adminServices.getSongsByGenre(genre);
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

const getSongReviews = async (req, res) => {
  try {
    let { song_id } = req.params;
    const reviews = await adminServices.getSongReviews(song_id);
    return Response.success(res, 'reviews fetched successfully', 200, reviews);
  } catch (error) {
    return error;
  }
};

const deleteUserReview = async (req, res) => {
  try {
    let { user_id } = req.params;
    await adminServices.deleteReviews(user_id);
    return Response.success(res, 'review deleted successfully', 200);
  } catch (error) {
    return error;
  }
};

const deactivateAdmin = async (req, res) => {
  try {
    let { admin_id } = req.params;
    let { status } = req.body;
    const admin = await adminServices.getAdmins(admin_id);
    delete admin.password;
    const deactivatedAdmin = await adminServices.updateAdminStatus(status, admin_id);
    return Response.success(res, 'admin deactivated successfully', 200, deactivatedAdmin);
  } catch (error) {
    return error;
  }
};
const reactivateAdmin = async (req, res) => {
  try {
    let { admin_id } = req.params;
    let { status } = req.body;
    const admin = await adminServices.getAdmins(admin_id);
    delete admin.password;
    const reactivatedAdmin = await adminServices.updateAdminStatus(status, admin_id);
    return Response.success(res, 'admin reactivated successfully', 200, reactivatedAdmin);
  } catch (error) {
    return error;
  }
};
const suspendAdmin = async (req, res) => {
  try {
    let { admin_id } = req.params;
    let { status } = req.body;
    const admin = await adminServices.getAdmins(admin_id);
    delete admin.password;
    const suspendedAdmin = await adminServices.updateAdminStatus(status, admin_id);
    return Response.success(res, 'admin suspended successfully', 200, suspendedAdmin);
  } catch (error) {
    return error;
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { status } = req.body;
    const { user_id } = req.params;
    const deactivatedUser = await adminServices.updateUsersStatus(status, user_id);
    return Response.success(res, 'user deactivated successfully', 200, deactivatedUser);
  } catch (error) {
    console.log(error);
    return (error);
  }
};
const suspendUser = async (req, res) => {
  try {
    const { status } = req.body;
    const { user_id } = req.params;
    const suspendedUser = await adminServices.updateUsersStatus(status, user_id);
    return Response.success(res, 'user suspended successfully', 200, suspendedUser);
  } catch (error) {
    console.log(error);
    return (error);
  }
};
const reactivateUser = async (req, res) => {
  try {
    const { status } = req.body;
    const { user_id } = req.params;
    const reactivatedUser = await adminServices.updateUsersStatus(status, user_id);
    return Response.success(res, 'user reactivated successfully', 200, reactivatedUser);
  } catch (error) {
    console.log(error);
    return (error);
  }
};

const getAllSongDetails = async (req, res) => {
  try {
    const { song_id } = req.params;
    const allSongDetails = {};
    const songDetails = await adminServices.getSongDetails(song_id);
    const reviewDetails = await adminServices.getReviewDetails(song_id);
    allSongDetails.details = songDetails;
    allSongDetails.reviews = reviewDetails;
    return Response.success(res, 'song details fetched successfully', 200, allSongDetails);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  createAdmin,
  updateAdmin,
  updateAdminStatus,
  addSongs,
  deleteSongs,
  editSongs,
  getAllSongs,
  getSongsByGenre,
  getSongReviews,
  deleteUserReview,
  deactivateAdmin,
  reactivateAdmin,
  suspendAdmin,
  deactivateUser,
  suspendUser,
  reactivateUser,
  getAllSongDetails,
};
