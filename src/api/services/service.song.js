import db from '../../config/db/index.js';
import songQueries from '../queries/query.song';

export const fetchSongs = async () => {
  const songs = await db.any(songQueries.getAllSongs);
  return songs;
};

export const searchSongByTitle = async (song_title) => {
  const songs = await db.oneOrNone(songQueries.getSongByTitle, [`%${song_title}%`]);
  return songs;
};

export const searchSongByGenre = async (genre) => {
  const songs = await db.oneOrNone(songQueries.getSongByGenre, [genre]);
  return songs;
};

export const getSongDetails = async (song_id) => {
  const songDetails = await db.oneOrNone(songQueries.getSongDetails, [song_id]);
  return songDetails;
};

export const getReviewDetails = async (song_id) => {
  const reviewDetails = await db.any(songQueries.getReviewDetails, [song_id]);
  return reviewDetails;
};

export const getAllSongIds = async (id) => {
  const ids = await db.oneOrNone(songQueries.getSongIds, [id]);
  return ids;
};

export const likeSongs = async (user_id, song_id) => {
  const like = await db.oneOrNone(songQueries.likeSongs, [user_id, song_id]);
  return like;
};

export const getSongUserId = async (user_id, song_id) => {
  const userIds = await db.oneOrNone(songQueries.getUserIds, [user_id, song_id]);
  return userIds;
};

export const dislikeSongs = async (user_id, song_id) => {
  const dislikes = await db.oneOrNone(songQueries.dislikeSongs, [user_id, song_id]);
  return dislikes;
};

export const geUserDislikeId = async (user_id, song_id) => {
  const userDislikeId = await db.oneOrNone(songQueries.getUserDislikeId, [user_id, song_id]);
  return userDislikeId;
};

export const deleteAsongLike = async (user_id) => {
  const deletedLike = await db.oneOrNone(songQueries.deleteAsongLike, [user_id]);
  return deletedLike;
};

export const deleteAsongDislike = async (user_id) => {
  const deletedDislike = await db.oneOrNone(songQueries.deleteAsongDislike, [user_id]);
  return deletedDislike;
};

export const rateAsong = async (user_id, song_id, rating) => {
  const ratedSong = await db.oneOrNone(songQueries.rateAsong, [user_id, song_id, rating]);
  return ratedSong;
};

export const getAratedSong = async (user_id, song_id) => {
  const ratedSong = await db.oneOrNone(songQueries.getUserRating, [user_id, song_id]);
  return ratedSong;
};

export const updateArating = async (rating, user_id, song_id) => {
  const updatedRating = await db.oneOrNone(songQueries.editAuserRating, [rating, user_id, song_id]);
  return updatedRating;
};

export const reviewSong = async (review, user_id, song_id) => {
  const reviewedSong = await db.oneOrNone(songQueries.reviewAsong, [review, user_id, song_id]);
  return reviewedSong;
};

export const getAreview = async (user_id, song_id) => {
  const reviewedSong = await db.oneOrNone(songQueries.getAreview, [user_id, song_id]);
  return reviewedSong;
};

export const likeAreview = async (review_id, user_id, song_id) => {
  const likedReview = await db.oneOrNone(songQueries.likeAreview, [review_id, user_id, song_id]);
  return likedReview;
};

export const checkAreviewLike = async (review_id, user_id, song_id) => {
  const likedReview = await db.oneOrNone(songQueries.getReviewLike, [review_id, user_id, song_id]);
  return likedReview;
};

export const getAsongReviews = async (song_id) => {
  const reviews = await db.any(songQueries.getUsersReview, [song_id]);
  return reviews;
};

export const getUsersThatLikeAsong = async (song_id) => {
  const users = await db.any(songQueries.getUsersThatLikesAsong, [song_id]);
  return users;
};

export const getUsersThatDislikeAsong = async (song_id) => {
  const users = await db.any(songQueries.getUsersThatDislikesAsong, [song_id]);
  return users;
};

export const getLikes = async () => {
  const likes = await db.any(songQueries.getLikes);
  return likes;
};

export const getDislikes = async () => {
  const dislikes = await db.any(songQueries.getDislikes);
  return dislikes;
};

export const getUsersThatLikeAReview = async (song_id, review_id) => {
  const users = await db.any(songQueries.getUsersThatLikesAReview, [song_id, review_id]);
  return users;
};

export const deleteAuserReview = async (user_id, song_id) => {
  const deletedReview = await db.oneOrNone(songQueries.deleteAuserReview, [user_id, song_id]);
  return deletedReview;
};

export const deleteAreviewLike = async (user_id, review_id, song_id) => {
  const deletedLike = await db.oneOrNone(songQueries.deleteAreviewLike, [user_id, review_id, song_id]);
  return deletedLike;
};
