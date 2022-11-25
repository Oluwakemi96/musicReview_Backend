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
        genre ILIKE $1
  `,
};
