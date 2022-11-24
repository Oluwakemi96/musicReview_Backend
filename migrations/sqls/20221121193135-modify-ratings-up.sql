/* Replace with your SQL commands */
CREATE TYPE rating_value AS ENUM('1', '2', '3', '4', '5');

ALTER TABLE ratings 
ADD COLUMN IF NOT EXISTS rating rating_value; 

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS email_address VARCHAR;