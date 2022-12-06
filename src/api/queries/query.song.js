export default {
  getAllSongs: `
        SELECT 
            song_link, 
            song_title, 
            artist
        FROM 
            songs
        ORDER BY created_at DESC
    `,

  getSongByTitle: `
        SELECT 
            song_link,
            song_title, 
            artist
        FROM 
            songs
        WHERE 
            song_title ILIKE $1
  `,
  getSongByGenre: `
    SELECT 
        genre
    FROM 
        songs
    WHERE 
        genre = $1
    ORDER BY created_at DESC
  `,
  getSongDetails: `
            SELECT
                *
              FROM 
                songs
            WHERE id = $1
  `,
  getSongIds: `
    SELECT 
        id 
    FROM 
        songs
    WHERE 
        id = $1
  `,
  likeSongs: `
    INSERT 
      INTO 
        song_likes (user_id, song_id)
    VALUES ($1, $2)
    RETURNING *
  `,
  getUserIds: `
    SELECT 
        user_id 
    FROM 
        song_likes
    WHERE 
        user_id = $1 
    AND
      song_id = $2
  `,

  dislikeSongs: `
    INSERT 
       INTO 
        song_dislikes(user_id, song_id)
    VALUES ($1, $2)
    RETURNING *
          
  `,
  getUserDislikeId: `
    SELECT 
       user_id
    FROM 
       song_dislikes
    WHERE 
        user_id = $1 
     AND 
       song_id = $2
  `,

  deleteAsongLike: `
    DELETE 
        FROM 
          song_likes
    WHERE
        user_id = $1 
            
  `,
  deleteAsongDislike: `
    DELETE
        FROM
         song_dislikes
    WHERE
        user_id = $1
  `,
  rateAsong: `
    INSERT 
       INTO
         ratings(user_id, song_id, rating)
    VALUES ($1, $2, $3)
    RETURNING *
  `,
  getUserRating: `
    SELECT
      rating
        FROM
      ratings
    WHERE
      user_id = $1
    AND
      song_id = $2
  `,
  editAuserRating: `
    UPDATE 
        ratings
    SET
        rating = $1
    WHERE 
        user_id = $2
    AND
        song_id = $3
    RETURNING *
  `,
  reviewAsong: `
    INSERT 
        INTO 
          reviews(review, user_id, song_id)
    VALUES($1, $2, $3)
    RETURNING *     
  `,
  likeAreview: `
    INSERT 
        INTO 
            reviews_likes(review_id, user_id, song_id)
    VALUES($1, $2, $3)
    RETURNING *
  `,
  getAreview: `
    SELECT 
        id, 
        review
    FROM 
        reviews
    WHERE 
        user_id = $1
    AND 
        song_id = $2
  `,
  getReviewLike: `
    SELECT 
        review_id,
        user_id,
        song_id
    FROM 
        reviews_likes
    WHERE 
        review_id = $1
    AND 
        user_id = $2 
    AND 
        song_id = $3
  `,

  getUsersReview: `
    SELECT
        review
    FROM
        reviews
    WHERE 
        song_id = $1
  `,

  getUsersThatLikesAsong: `
    SELECT 
        users.full_name
    FROM 
        users
    JOIN 
        song_likes
    ON 
        users.id = song_likes.user_id
    WHERE 
        song_likes.song_id = $1;
  `,

  getUsersThatDislikesAsong: `
    SELECT 
        users.full_name
    FROM 
        users
    JOIN 
        song_dislikes
    ON 
        users.id = song_dislikes.user_id
    WHERE 
        song_dislikes.song_id = $1;
  `,

  getLikes: `
    SELECT 
        id,
        user_id,
        song_id
    FROM
        song_likes
  `,

  getDislikes: `
    SELECT
        id,
        user_id,
        song_id
    FROM 
        song_dislikes
  `,

  getUsersThatLikesAReview: `
    SELECT 
       users.full_name
    FROM 
       users
    JOIN 
       reviews_likes
    ON 
       users.id = reviews_likes.user_id
    WHERE 
       reviews_likes.song_id = $1
    AND 
       reviews_likes.review_id = $2
  `,

  deleteAuserReview: `
    DELETE 
        FROM 
           reviews
    WHERE
        user_id =$1
    AND 
        song_id = $2
  `,

  deleteAreviewLike: `
    DELETE
        FROM 
            reviews_likes
    WHERE
        user_id = $1
    AND 
        review_id = $2
    AND 
        song_id = $3
  `,

};
