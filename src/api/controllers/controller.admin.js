import * as adminServices from '../services/service.admin.js';
import Response from '../../lib/http/lib.http.response.js';
import mails from '../../lib/utils/sendMails.js';

/**
 * creates a regular admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */

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

/**
 * updates a regular admin's password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const updateAdminPassword = async (req, res) => {
  try {
    const { hashedPassword } = req;
    const { password_token } = req.body;
    const updatedAdmin = await adminServices.updateRegularAdmin(hashedPassword, password_token);
    delete updatedAdmin.password;
    return Response.success(res, 'admin updated successfully', 200, updatedAdmin);
  } catch (error) {
    return error;
  }
};

/**
 * updates a regular admin's status
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */

/**
 * add songs to the database
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * deletes song from the database
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const deleteSongs = async (req, res) => {
  try {
    const { song_id } = req.params;
    await adminServices.deleteSongs(song_id);
    return Response.success(res, 'song deleted successfully', 200);
  } catch (error) {
    return error;
  }
};

/**
 * edits songs
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */

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

/**
 * gets all the song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const getAllSongs = async (req, res) => {
  try {
    const songs = await adminServices.getAllSongs();
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

/**
 * gets song by genre
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const getSongsByGenre = async (req, res) => {
  try {
    let { genre } = req.query;
    const songs = await adminServices.getSongsByGenre(genre);
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

/**
 * gets reviews of a particular song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const getSongReviews = async (req, res) => {
  try {
    let { song_id } = req.params;
    const reviews = await adminServices.getSongReviews(song_id);
    return Response.success(res, 'reviews fetched successfully', 200, reviews);
  } catch (error) {
    return error;
  }
};

/**
 * deletes a user's review
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const deleteUserReview = async (req, res) => {
  try {
    let { user_id } = req.params;
    await adminServices.deleteReviews(user_id);
    return Response.success(res, 'review deleted successfully', 200);
  } catch (error) {
    return error;
  }
};

/**
 * deactivates an admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * reactivates a suspended or deactivated admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * suspends an admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * deactivates a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * suspends a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 *reactivates a suspended or deactivated user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
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

/**
 * gets all the details of a particular song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminController
 */
const getAllSongDetails = async (req, res) => {
  try {
    const { song_id } = req.params;
    const basicDetails = await adminServices.getSongDetails(song_id);
    const reviewDetails = await adminServices.getReviewDetails(song_id);
    const allSongDetails = {
      ...basicDetails,
      reviews: reviewDetails,
    };
    return Response.success(res, 'song details fetched successfully', 200, allSongDetails);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  createAdmin,
  updateAdminPassword,
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
