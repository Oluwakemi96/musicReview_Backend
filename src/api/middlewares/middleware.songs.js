import * as songServices from '../services/service.song';
import Response from '../../lib/http/lib.http.response';

const checkIfIdExists = async (req, res, next) => {
  try {
    let { id } = req.query;
    let existingId = await songServices.getAllSongIds(id);
    if (!existingId) {
      return Response.error(res, 'the song you are searching for is not available', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const getSongToLike = async (req, res, next) => {
  try {
    let { id } = req.query;
    let song = await songServices.getAllDetails(id);
    let song_id = song.id;
    req.song_id = song_id;
    return next();
  } catch (error) {
    return error;
  }
};

const checkIfUserAlreadyLikedAsong = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req;
    let existingUserId = await songServices.getSongUserId(user_id);
    let existingSongId = await songServices.getSongLikeId(song_id);
    if (existingUserId && existingSongId) {
      return Response.error(res, 'you already liked this particular song', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

export default {
  checkIfIdExists,
  getSongToLike,
  checkIfUserAlreadyLikedAsong,
};
