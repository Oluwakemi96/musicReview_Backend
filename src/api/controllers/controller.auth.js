/* eslint-disable prefer-const */
import * as authServices from '../services/service.auth';
import Response from '../../lib/http/lib.http.response';
// import hash from '../../lib/hash/hash.auth';
import mails from '../../lib/utils/sendMails';

const registerUser = async (req, res) => {
  const {
    body: {
      full_name, username, email_address,
    }, hashedPassword,
  } = req;
  try {
    const user = await authServices.registerUser(full_name.trim().toLowerCase(), username.trim().toLowerCase(), hashedPassword, email_address.trim().toLowerCase());
    mails.sendSignUp(email_address);
    delete user[0].password;
    return Response.success(res, 'user registered successfully', 200, user);
  } catch (error) {
    return error;
  }
};

const login = async (req, res) => {
  let { email_address } = req.body;
  let { token } = req;
  try {
    const user = await authServices.getUserByEmail(email_address);
    return res.status(200).json({
      status: 'success',
      message: 'user logged in successfully',
      data: {
        user,
        sessionToken: token,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const forgotPassword = async (req, res) => {
  let { email_address } = req.body;
  let { token } = req;
  try {
    const resetLink = `http://music.com/reset_password?token=${token}`;
    mails.resetPassword(email_address, resetLink);
    return Response.success(res, 'link to reset your password has been sent to your mail', 200, token);
  } catch (error) {
    return error;
  }
};

const resetPassword = async (req, res) => {
  const { email_address } = req.user;
  const { hashedPassword } = req;
  try {
    await authServices.resetPassword(hashedPassword, email_address);
    mails.passwordUpdated(email_address);
    return Response.success(res, 'password updated successfully', 200);
  } catch (error) {
    return error;
  }
};
export default {
  registerUser,
  login,
  forgotPassword,
  resetPassword,
};
