export default {
  createAdmin: `
        INSERT 
            INTO
              admins(first_name, last_name, email, password_token)
        VALUES($1, $2, $3, $4)
        RETURNING *         
    `,
  updateRegularAdmin: `
    UPDATE 
        admins
    SET 
        updated_at = NOW(),
        password = $1
    WHERE 
        id = $2
    RETURNING *
 `,
  getPasswordToken: `
    SELECT
        password_token
    FROM 
        admins
    WHERE
        id = $1
 `,
  setAdminStatus: `
     UPDATE 
         admins
     SET 
        updated_at = NOW(),
        status = $1
    WHERE 
        id = $2
  `,
  getAdmins: `
    SELECT 
        * 
    FROM 
        admins
    WHERE 
        id = $1
  `,
  addSongs: `
    INSERT 
        INTO
           songs(song_title, year_of_release, genre, album_name, artist, song_link)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
  deleteSong: `
    DELETE
        FROM
          songs
    WHERE
        id = $1
  `,
  editSong: `
    UPDATE 
        songs
    SET 
        updated_at = NOW(),
        song_title = $1,
        year_of_release = $2,
        genre = $3,
        album_name = $4,
        artist = $5,
        song_link = $6
    WHERE
        id = $7
    RETURNING *
  `,
  getSong: `
    SELECT 
        song_title,
        year_of_release,
        genre,
        album_name,
        artist,
        song_link 
    FROM 
        songs
    WHERE 
        id = $1
  `,

  getAllSongs: `
  SELECT 
    song_title,
    year_of_release,
    genre,
    album_name,
    artist,
    song_link 
  FROM 
    songs
  ORDER BY created_at DESC;
  `,
  getSongsByGenre:
    `SELECT
         song_title,
         year_of_release,
         genre,
         album_name,
         artist,
         song_link 
        FROM 
            songs
        WHERE
            genre = $1
    ORDER BY created_at DESC
  `,

  getUsersReviews: `
      SELECT
          review
      FROM 
        reviews
      WHERE 
         song_id = $1
  `,

  deleteReview: `
        DELETE 
            FROM 
             reviews 
        WHERE
            user_id = $1      
  `,

  getAllAdmins: `
        SELECT 
            first_name,
            last_name,
            email,
            type,
            status
        FROM 
            admins
  `,

  updateAdminStatus: `
        UPDATE 
            admins
        SET 
            updated_at = NOW(),
            status = $1
        WHERE 
            id = $2
  
  `,

  setUsersStatus: `
    UPDATE
        users
    SET
        status = $1
    WHERE
        id = $2
  `,
};
