import logger from '../../config/logger';
import * as songServices from '../services/service.song';
import Response from '../../lib/http/lib.http.response';

// eslint-disable-next-line consistent-return
const allSongs = async (req, res) => {
  try {
    const songs = await songServices.fetchSongs();
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    // logger.error(`songController/allSongs, ${error.message}`);
    return error;
  }
};

const songByTitle = async (req, res) => {
  const { song_title } = req.query;
  try {
    const songs = await songServices.searchSongByTitle(song_title);
    logger.info('search query return, songController/songByTitle');
    return res.status(200).json({
      status: 'success',
      message: 'song fetched successfully',
      data: songs,
    });
  } catch (error) {
    // logger.error(`songController/songByTitle, ${error.message}`);
    return error;
  }
};

export default {
  allSongs,
  songByTitle,
};