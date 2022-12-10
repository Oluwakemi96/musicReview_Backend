/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
import * as adminServices from '../services/service.admin.js';
import Response from '../../lib/http/lib.http.response.js';
import hash from '../../lib/hash/hash.auth.js';

/**
 * verifies the password token entered by the admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminMiddleware
 */
const checkPasswordToken = async (req, res, next) => {
  try {
    let { password_token } = req.body;
    const existingToken = await adminServices.getPasswordToken(password_token);
    // eslint-disable-next-line eqeqeq
    if (existingToken.password_token != password_token) {
      return Response.error(res, 'unauthorised access', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * generates a random token string
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminMiddleware
 */
const generateRandomStringToken = async (req, res, next) => {
  try {
    const adminToken = await hash.generateRandomString(10);
    req.adminToken = adminToken;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks the type of an admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminMiddleware
 */
const checkIfAdminIsRegular = async (req, res, next) => {
  try {
    let { id } = req.params;
    const admins = await adminServices.getAdmins(id);
    if (admins.password && admins.type == 'regular') {
      return next();
    }
    return Response.error(res, 'admin has not verified his email address', 401);
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks the status of an admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminMiddleware
 */
const checkAdminStatus = async (req, res, next) => {
  try {
    let { id } = req.admin;
    const admin = await adminServices.getAdmins(id);
    if (admin.status === 'deactivated' || admin.status === 'suspended') { return Response.error(res, 'Access denied, please contact support', 401); }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * fetches admin
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof AdminMiddleware
 */
const getsuperAdmin = async (req, res, next) => {
  try {
    let { id } = req.admin;
    const admin = await adminServices.getAdmins(id);
    if (admin.type !== 'super') {
      return Response.error(res, 'Access denied, please contact support', 403);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  checkPasswordToken,
  generateRandomStringToken,
  checkIfAdminIsRegular,
  checkAdminStatus,
  getsuperAdmin,
};
