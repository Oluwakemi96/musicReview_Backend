/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
import * as adminServices from '../services/service.admin';
import Response from '../../lib/http/lib.http.response';
import hash from '../../lib/hash/hash.auth';

const checkPasswordToken = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { password_token } = req.body;
    const existingToken = await adminServices.getPasswordToken(id);
    // eslint-disable-next-line eqeqeq
    console.log(existingToken);
    if (existingToken.password_token != password_token) {
      return Response.error(res, 'unauthorised access', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const generateRandomStringToken = async (req, res, next) => {
  try {
    const adminToken = await hash.generateRandomString(50);
    req.adminToken = adminToken;
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfAdminIsRegular = async (req, res, next) => {
  try {
    let { id } = req.params;
    const admins = await adminServices.getAdmins(id);
    if (admins.password && admins.type == 'regular') {
      return next();
    }
    return Response.error(res, 'admin has not verified his email address', 400);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  checkPasswordToken,
  generateRandomStringToken,
  checkIfAdminIsRegular,
};
