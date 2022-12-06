/* Replace with your SQL commands */
ALTER TABLE IF EXISTS users
    ADD COLUMN IF NOT EXISTS password_token TEXT;