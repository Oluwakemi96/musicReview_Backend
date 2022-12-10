export default {
  registerUser: `
     INSERT 
        INTO 
          users (
        full_name,
        username,
        password,
        email_address,
        password_token
     )
     VALUES($1, $2, $3, $4, $5)
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
  getUserById: `
            SELECT 
               *
            FROM 
              users
            WHERE
              id = $1

  `,
  getUserByToken: `
            SELECT
              *
          FROM 
            users
          WHERE
            password_token = $1  
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

  updateStatus: `
      UPDATE
          users 
      SET
        updated_at = NOW(),
        password_token = null,
        staus = 'active'
      WHERE
          id = $1
            
  `,

};
