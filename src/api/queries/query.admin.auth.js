export default {
  findAdminEmail: `
       SELECT 
          email
       FROM 
          admins
        WHERE 
            email = $1 
   `,
  getAdminByEmail: `
        SELECT
            id,
            first_name,
            last_name,
            email,
            type,
            password,
            status
        FROM
            admins
        WHERE 
            email = $1
   `,

  getAdminById: `
    SELECT
        id,
        first_name,
        last_name,
        email,
        type,
        password,
        status
    FROM
        admins
    WHERE 
        id = $1
   `,

  updatePassword: `
    UPDATE 
        admins
    SET 
        password = $1
    WHERE 
        email = $2
    RETURNING *
  `,

};
