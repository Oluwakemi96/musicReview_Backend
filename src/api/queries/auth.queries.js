const authQueries = {
  getAllSongs: `
        SELECT 
            song_link 
        FROM 
            songs
        ORDER BY created_at DESC
    `,
};

export default authQueries;
