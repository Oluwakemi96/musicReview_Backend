import authQueries from '../queries/auth.queries';
import db from '../../config/db/index.js';
// import logger from '../../config/logger';

// eslint-disable-next-line consistent-return
const allSongs = async (req, res) => {
  try {
    const songs = await db.any(authQueries.getAllSongs);
    return res.status(200).json({
      status: 'success',
      message: 'songs fetched successfully',
      data: songs,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default allSongs;
