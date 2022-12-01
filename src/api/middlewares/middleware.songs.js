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

const getSongId = async (req, res, next) => {
  try {
    let { id } = req.query;
    let song = await songServices.getAllDetails(id);
    req.song = song;
    return next();
  } catch (error) {
    return error;
  }
};

const checkIfUserAlreadyLikedAsong = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let song_id = req.song.id;
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already liked this particular song', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const checkIfUserAlreadyDislikedAsong = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let song_id = req.song.id;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already disliked this particular song', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const removeALike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let song_id = req.song.id;
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongLike(user_id);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const removeAdislike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let song_id = req.song.id;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongDislike(user_id);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const checkIfAratingExist = async (req, res, next) => {
  try {
    let { user: { id } } = req;
    let song_id = req.song.id;
    let user_id = id;
    let existingRating = await songServices.getAratedSong(user_id, song_id);
    if (!existingRating) {
      return Response.error(res, 'you have not rated this song', 401);
    }
    return next();
  } catch (error) {
    return error;
  }
};

const getReviewId = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let reviewedSong = await songServices.getAreview(user_id);
    req.reviewedSong = reviewedSong;
    return next();
  } catch (error) {
    return error;
  }
};

const checkIfAuserAlreadyLikedAreview = async (req, res, next) => {
  try {
    let review_id = req.reviewedSong.id;
    let user_id = req.user.id;

    const existingReviewLike = await songServices.checkAreviewLike(review_id, user_id);
    if (existingReviewLike) {
      return Response.error(res, 'you already liked this review', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfLikesExists = async (req, res, next) => {
  try {
    const likes = await songServices.getLikes();
    if (likes.length === 0) {
      return Response.error(res, 'no one has disliked this song', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfDislikesExists = async (req, res, next) => {
  try {
    const dislikes = await songServices.getDislikes();
    if (dislikes.length === 0) {
      return Response.error(res, 'no one has disliked this song', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  checkIfIdExists,
  getSongId,
  checkIfUserAlreadyLikedAsong,
  checkIfUserAlreadyDislikedAsong,
  removeALike,
  removeAdislike,
  checkIfAratingExist,
  getReviewId,
  checkIfAuserAlreadyLikedAreview,
  checkIfLikesExists,
  checkIfDislikesExists,
};
