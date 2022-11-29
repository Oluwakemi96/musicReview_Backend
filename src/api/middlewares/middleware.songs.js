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

const getSongToLikeOrDislike = async (req, res, next) => {
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
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already liked this particular song', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfUserAlreadyDislikedAsong = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already disliked this particular song', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeALike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req;
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongLike(user_id, song_id);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const removeAdislike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongDislike(user_id);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  checkIfIdExists,
  getSongToLikeOrDislike,
  checkIfUserAlreadyLikedAsong,
  checkIfUserAlreadyDislikedAsong,
  removeALike,
  removeAdislike,
};
