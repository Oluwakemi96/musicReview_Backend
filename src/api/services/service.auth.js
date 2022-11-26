import db from '../../config/db/index';
import authQueries from '../queries/query.auth';

export const registerUser = async (full_name, username, password, email_address) => {
  // eslint-disable-next-line max-len
  const user = await db.any(authQueries.registerUser, [full_name, username, password, email_address]);
  return user;
};

export const userEmail = async (email_address) => {
  const email = await db.oneOrNone(authQueries.findEmail, [email_address]);
  return email;
};

export const getUserByEmail = async (email_address) => {
  const user = await db.oneOrNone(authQueries.getUserByEmail, [email_address]);
  return user;
};

export const getUserById = async (id) => {
  const user = await db.oneOrNone(authQueries.getUserById, [id]);
  return user;
};

export const resetPassword = async (password, email_address) => {
  const passwordReset = await db.oneOrNone(authQueries.updatePassword, [password, email_address]);
  return passwordReset;
};

export const usernameCheck = async (username) => {
  const getUsername = await db.oneOrNone(authQueries.findUsername, [username]);
  return getUsername;
};
