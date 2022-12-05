import db from '../../config/db/index';
import adminAuthQueries from '../queries/query.admin.auth';

export const getAdminEmail = async (email) => {
  const email_address = await db.oneOrNone(adminAuthQueries.findAdminEmail, [email]);
  return email_address;
};

export const getAdminDetailsByEmail = async (email) => {
  const details = await db.oneOrNone(adminAuthQueries.getAdminByEmail, [email]);
  return details;
};

export const getAdminDetailsById = async (admin_id) => {
  const details = await db.oneOrNone(adminAuthQueries.getAdminById, [admin_id]);
  return details;
};

export const updateAdminPassword = async (password, email) => {
  const updatedAdmin = db.oneOrNone(adminAuthQueries.updatePassword, [password, email]);
  return updatedAdmin;
};
