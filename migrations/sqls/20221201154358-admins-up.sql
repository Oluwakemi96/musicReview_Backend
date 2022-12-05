/* Replace with your SQL commands */
CREATE TYPE admin_type AS ENUM('super', 'regular');
CREATE TYPE users_status AS ENUM('active', 'inactive', 'deactivated', 'suspended');

CREATE TABLE IF NOT EXISTS admins(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    type admin_type DEFAULT 'regular',
    password TEXT,
    password_token TEXT,
    status users_status DEFAULT 'inactive',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users 
ADD COLUMN staus users_status DEFAULT 'inactive';

INSERT INTO admins(first_name, last_name, email, type, password, status)
VALUES('Rashidat', 'sikiru', 'rashidats@enyata.com', 'super', '$2b$10$NM0L9hhUFFCzil8nvX3U0uWitCOXKT4G2BaqTM7LHQL1R.gMMXtGe', 'active')
ON CONFLICT (email)
DO UPDATE
SET 
first_name = EXCLUDED.first_name,
last_name = EXCLUDED.last_name,
type = EXCLUDED.type,
password = EXCLUDED.password,
status = EXCLUDED.status;
