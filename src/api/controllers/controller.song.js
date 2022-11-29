// import logger from '../../config/logger';
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
    // logger.info('search query return, songController/songByTitle');
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

const SongByGenre = async (req, res) => {
  const { genre } = req.query;
  try {
    const songs = await songServices.searchSongByGenre(genre);
    if (!songs) {
      return Response.error(res, 'there is no song with the genre', 422);
    }
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

const songDetails = async (req, res) => {
  let { id } = req.query;
  try {
    const details = await songServices.getAllDetails(id);
    return Response.success(res, 'song details fetched successfully', 200, details);
  } catch (error) {
    return error;
  }
};

const likeAsong = async (req, res) => {
  let { id } = req.user;
  let user_id = id;
  let { song_id } = req;
  try {
    const likes = await songServices.likeSongs(user_id, song_id);
    return Response.success(res, 'song liked successfully', 200, likes);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  allSongs,
  songByTitle,
  SongByGenre,
  songDetails,
  likeAsong,
};
