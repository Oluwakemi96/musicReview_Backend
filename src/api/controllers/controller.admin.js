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
    console.log(error);
    return error;
  }
};

const updateAminStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const updatedAdmin = await adminServices.setAdminStatus(status, id);
    return Response.success(res, 'status updated successfully', 200, updatedAdmin);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return error;
  }
};

const deleteSongs = async (req, res) => {
  try {
    const { song_id } = req.params;
    await adminServices.deleteSongs(song_id);
    return Response.success(res, 'song deleted successfully', 200);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export default {
  createAdmin,
  updateAdmin,
  updateAminStatus,
  addSongs,
  deleteSongs,

};
