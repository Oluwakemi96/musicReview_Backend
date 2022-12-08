import * as songServices from '../services/service.song';
import * as authServices from '../services/service.auth';
import Response from '../../lib/http/lib.http.response';

/**
 * checks if a song's id exists
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfSongIdExists = async (req, res, next) => {
  try {
    let { song_id } = req.params;
    let existingId = await songServices.getAllSongIds(song_id);
    if (!existingId) {
      return Response.error(res, 'the song you are searching for is not available', 404);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * checks if a user already likes a song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfUserAlreadyLikedAsong = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req.params;
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already liked this particular song', 403);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * checks if a user already disliked a song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfUserAlreadyDislikedAsong = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let { song_id } = req.params;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      return Response.error(res, 'you already disliked this particular song', 403);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * deletes the like of a particular song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const removeALike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req.params;
    let existingUserId = await songServices.getSongUserId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongLike(user_id);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * deletes the dislike of a particular song
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const removeAdislike = async (req, res, next) => {
  try {
    let { id } = req.user;
    let user_id = id;
    let { song_id } = req.params;
    let existingUserId = await songServices.geUserDislikeId(user_id, song_id);
    if (existingUserId) {
      await songServices.deleteAsongDislike(user_id);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * checks if a song has been rated
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfAratingExist = async (req, res, next) => {
  try {
    let { user: { id } } = req;
    let { song_id } = req.params;
    let user_id = id;
    let existingRating = await songServices.getAratedSong(user_id, song_id);
    if (!existingRating) {
      return Response.error(res, 'you have not rated this song', 403);
    }
    return next();
  } catch (error) {
    return error;
  }
};

/**
 * checks if a user has liked a review
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfAuserAlreadyLikedAreview = async (req, res, next) => {
  try {
    let { review_id, song_id } = req.params;
    let user_id = req.user.id;

    const existingReviewLike = await songServices.checkAreviewLike(review_id, user_id, song_id);
    if (existingReviewLike) {
      return Response.error(res, 'you already liked this review', 403);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks if a review has been liked
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfAlikeForAreviewExist = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let { review_id, song_id } = req.params;
    const likes = await songServices.checkAreviewLike(review_id, user_id, song_id);
    if (likes) {
      await songServices.deleteAreviewLike(user_id, review_id, song_id);
      return next();
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks the status of a user
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkUserCurrentStatus = async (req, res, next) => {
  try {
    let user_id = req.user.id;
    let user = await authServices.getUserById(user_id);
    if (user.status === 'inactive' || user.status === 'deactivated' || user.status === 'suspended') {
      return Response.error(res, 'Access denied please contact admin', 401);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

/**
 * checks if a review exists
 * @param {Request} req -The request from the endpoint
 * @param {Response} res -The response returned by the method/function
 * @param {Next} next -Calls the next operation
 * @returns {Object} -Returns an object (error or response)
 * @memberof SongsMiddleware
 */
const checkIfReviewIdExists = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const existingReviewId = await songServices.getReviewIds(review_id);
    if (!existingReviewId) {
      return Response.error(res, 'review is not available for this song', 404);
    }
    return next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  checkIfSongIdExists,
  checkIfUserAlreadyLikedAsong,
  checkIfUserAlreadyDislikedAsong,
  removeALike,
  removeAdislike,
  checkIfAratingExist,
  checkIfAuserAlreadyLikedAreview,
  checkIfAlikeForAreviewExist,
  checkUserCurrentStatus,
  checkIfReviewIdExists,
};
