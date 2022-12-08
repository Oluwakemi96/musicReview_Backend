/* eslint-disable prefer-const */
import * as authServices from '../services/service.auth';
import Response from '../../lib/http/lib.http.response';
import mails from '../../lib/utils/sendMails';

/**
 * signs up a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const registerUser = async (req, res) => {
  const {
    body: {
      full_name, username, email_address,
    }, hashedPassword,
  } = req;
  const { userToken } = req;
  const verificationLink = `http://music_review.com?token=${userToken}`;
  try {
    const user = await authServices.registerUser(full_name.trim().toLowerCase(), username.trim().toLowerCase(), hashedPassword, email_address.trim().toLowerCase(), userToken);
    mails.sendSignUp(email_address, verificationLink);
    delete user[0].password;
    return Response.success(res, 'user registered successfully', 200, user);
  } catch (error) {
    return error;
  }
};

/**
 * updates a user's status
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { user_id } = req.params;
    const updatedStatus = await authServices.updateUserStatus(status, user_id);
    return Response.success(res, 'user status updated successfully', 200, updatedStatus);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * logs in a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const login = async (req, res) => {
  let { email_address } = req.body;
  let { token } = req;
  try {
    const user = await authServices.getUserByEmail(email_address.trim().toLowerCase());
    delete user.password;
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

/**
 * sends a mail with a token to reset a user's password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const forgotPassword = async (req, res) => {
  let { email_address } = req.body;
  let { token } = req;
  try {
    const resetLink = `http://music.com/reset_password?token=${token}`;
    mails.resetPassword(email_address, resetLink);
    return Response.success(res, 'link to reset your password has been sent to your mail', 200);
  } catch (error) {
    return error;
  }
};

/**
 * resets a user's password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const resetPassword = async (req, res) => {
  const { email_address } = req.user;
  const { hashedPassword } = req;
  try {
    await authServices.resetPassword(hashedPassword.trim().toLowerCase(), email_address).trim().toLowerCase();
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
  updateUserStatus,
};
