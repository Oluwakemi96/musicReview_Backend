/* Replace with your SQL commands */
DROP TYPE IF EXISTS rating_value CASCADE;

ALTER TABLE ratings 
DROP COLUMN IF EXISTS rating;

ALTER TABLE users 
DROP COLUMN IF EXISTS email_address;