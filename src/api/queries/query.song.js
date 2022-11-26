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
};
