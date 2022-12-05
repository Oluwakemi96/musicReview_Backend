/* eslint-disable consistent-return */
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
    const songs = await songServices.searchSongByTitle(song_title.trim().toLowerCase());
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
    const songs = await songServices.searchSongByGenre(genre.trim().toLowerCase());
    if (!songs) {
      return Response.error(res, 'there is no song with the genre', 422);
    }
    return Response.success(res, 'songs fetched successfully', 200, songs);
  } catch (error) {
    return error;
  }
};

const songDetails = async (req, res) => {
  let { id } = req.params;
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
  let song_id = req.song.id;
  try {
    const likes = await songServices.likeSongs(user_id, song_id);
    return Response.success(res, 'song liked successfully', 200, likes);
  } catch (error) {
    return error;
  }
};

const dislikeAsong = async (req, res) => {
  let { id } = req.user;
  let user_id = id;
  let song_id = req.song.id;
  try {
    const dislikes = await songServices.dislikeSongs(user_id, song_id);
    return Response.success(res, 'song disliked successfully', 200, dislikes);
  } catch (error) {
    return error;
  }
};

const rateAsong = async (req, res) => {
  let { user: { id }, body: { rating } } = req;
  let user_id = id;
  let { song_id } = req.params;
  try {
    const checkRating = await songServices.getAratedSong(user_id, song_id);
    if (!checkRating) {
      const ratedSong = await songServices.rateAsong(user_id, song_id, rating);
      return Response.success(res, 'song rated successfully', 200, ratedSong);
    }
    const updatedRating = await songServices.updateArating(rating, user_id, song_id);
    return Response.success(res, 'rating updated successfully', 200, updatedRating);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const reviewSong = async (req, res) => {
  let user_id = req.user.id;
  let { song_id } = req.params;
  let review = req.body;
  try {
    const reviewedSong = await songServices.reviewSong(review, user_id, song_id);
    return Response.success(res, 'song reviewed successfully', 200, reviewedSong);
  } catch (error) {
    return error;
  }
};

const likeReview = async (req, res) => {
  let { review_id } = req.params;
  let user_id = req.user.id;
  let { song_id } = req.params;
  try {
    const likedReview = await songServices.likeAreview(review_id, user_id, song_id);
    return Response.success(res, 'review liked successfully', 200, likedReview);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getAsongReview = async (req, res) => {
  let { song_id } = req.params;
  try {
    const review = await songServices.getAsongReviews(song_id);
    return Response.success(res, 'songs fetched successfully', 200, review);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUsersThatLikeAsong = async (req, res) => {
  try {
    let { song_id } = req.params;
    const users = await songServices.getUsersThatLikeAsong(song_id);
    let usersStr = users.map((user) => user.full_name);
    return Response.success(res, 'users fetched successfully', 200, usersStr);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUsersThatDislikeAsong = async (req, res) => {
  try {
    let { song_id } = req.params;
    const users = await songServices.getUsersThatDislikeAsong(song_id);
    console.log(users);
    let usersStr = users.map((user) => user.full_name);

    return Response.success(res, 'users fetched successfully', 200, usersStr);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getUsersThatLikesAReview = async (req, res) => {
  try {
    let { song_id, review_id } = req.params;
    const users = await songServices.getUsersThatLikeAReview(song_id, review_id);
    let usersStr = users.map((user) => user.full_name);
    return Response.success(res, 'users fetched successfully', 200, usersStr);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteAuserReview = async (req, res) => {
  try {
    let user_id = req.user.id;
    let { song_id } = req.params;
    await songServices.deleteAuserReview(user_id, song_id);
    return Response.success(res, 'review deleted successfully', 200);
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
  dislikeAsong,
  rateAsong,
  reviewSong,
  likeReview,
  getAsongReview,
  getUsersThatLikeAsong,
  getUsersThatDislikeAsong,
  getUsersThatLikesAReview,
  deleteAuserReview,
};
