export default {
  registerUser: `
     INSERT 
        INTO 
          users (
        full_name,
        username,
        password,
        email_address
     )
     VALUES($1, $2, $3, $4)
     RETURNING *
    `,
  findEmail: `
        SELECT 
            email_address
        FROM 
            users
        WHERE
            email_address = $1
    `,
  getUserByEmail: `
            SELECT 
                *
            FROM 
                users
            WHERE
                email_address = $1
  `,
  getSongDetails: `
            SELECT
                *
              FROM 
                songs
            WHERE song_title ILIKE $1
  `,
  updatePassword: `
            UPDATE 
               users
            SET 
              password = $1
            WHERE 
              email_address = $2
            RETURNING *
  `,
  findUsername: `
            SELECT 
                username 
              FROM 
                users
            WHERE username = $1
  `,

};
