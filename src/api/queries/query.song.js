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
};
