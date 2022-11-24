/* eslint-disable prefer-const */
import * as authServices from '../services/service.auth';
import Response from '../../lib/http/lib.http.response';
import hash from '../../lib/hash/hash.auth';
import mails from '../../lib/utils/sendMails';

const registerUser = async (req, res) => {
  let {
    full_name, username, password, email_address,
  } = req.body;
  try {
    const existingEmail = await authServices.userEmail(email_address);
    if (existingEmail) {
      return Response.error(res, 'email already exist', 400);
    }
    const existingUsername = await authServices.usernameCheck(username);
    if (existingUsername) {
      return Response.error(res, 'username already exist', 400);
    }
    password = hash.passwordHash(`${password}`);
    mails.sendSignUp(email_address);
    const user = await authServices.registerUser(full_name, username, password, email_address);
    delete user[0].password;
    return Response.success(res, 'user registered successfully', 200, user);
  } catch (error) {
    return error;
  }
};

const login = async (req, res) => {
  let { email_address, password } = req.body;
  try {
    const existingEmail = await authServices.userEmail(email_address);
    if (!existingEmail) {
      return Response.error(res, 'email does not exist on our data base', 400);
    }
    const verifiedPassword = await hash.comparePassword(password, email_address);
    if (!verifiedPassword) {
      return Response.error(res, 'incorrect password', 422);
    }
    const user = await authServices.loginUser(email_address);
    delete user.password;
    const token = await hash.sessionToken(email_address);
    return res.status(200).json({
      status: 'success',
      message: 'user logged in successfully',
      data: {
        user,
        sessionToken: token,
      },
    });
  } catch (error) {
    return error;
  }
};

const songDetails = async (req, res) => {
  let { song_title } = req.query;
  try {
    const details = await authServices.getAllDetails(song_title);
    return Response.success(res, 'song details fetched successfully', 200, details);
  } catch (error) {
    return error;
  }
};

const forgotPassword = async (req, res) => {
  let { email_address } = req.body;
  try {
    const existingEmail = await authServices.userEmail(email_address);
    if (!existingEmail) {
      return Response.error(res, 'email address provided does not exist in our data base', 400);
    }

    const token = await hash.sessionToken(email_address);
    const resetLink = `http://music.com/reset_password?token=${token}`;
    mails.resetPassword(email_address, resetLink);
    return Response.success(res, 'link to reset your password has been sent to your mail', 200, token);
  } catch (error) {
    return error;
  }
};

const resetPassword = async (req, res) => {
  let { email_address } = req.user;
  let { password } = req.body;
  try {
    password = hash.passwordHash(`${password}`);
    await authServices.resetPassword(password, email_address);
    mails.passwordUpdated(email_address);
    return Response.success(res, 'password updated successfully', 200);
  } catch (error) {
    return error;
  }
};
export default {
  registerUser,
  login,
  songDetails,
  forgotPassword,
  resetPassword,
};
