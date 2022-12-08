import * as adminAuthServices from '../services/service.admin.auth';
import mails from '../../lib/utils/sendMails';
import Response from '../../lib/http/lib.http.response';

/**
 * logs in an admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const adminLogin = async (req, res) => {
  let { email } = req.body;
  let { token } = req;
  try {
    const admin = await adminAuthServices.getAdminDetailsByEmail(email);
    const data = {
      admin,
      sessionToken: token,
    };
    delete admin.password;
    return Response.success(res, 'admin logged in successfully', 200, data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * sends a token to the admin to reset his password
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const { token } = req;
    const resetLink = `http://music_library/reset_password?token=${token}`;
    mails.resetPassword(email, resetLink);
    return Response.success(res, 'link to reset your password has been sent to your mail', 200, token);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * resets the password of the password of the admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @returns {Object} -Returns an object (error or response)
 * @memberof AuthController
 */
const resetPassword = async (req, res) => {
  try {
    const { email } = req.admin;
    const { hashedPassword } = req;
    await adminAuthServices.updateAdminPassword(hashedPassword, email);
    mails.passwordUpdated(email);
    return Response.success(res, 'password updated successfully', 200);
  } catch (error) {
    console.log(error);
    return (error);
  }
};

export default {
  adminLogin,
  forgotPassword,
  resetPassword,
};
