/* Replace with your SQL commands */
ALTER TABLE IF EXISTS reviews_likes
ADD COLUMN song_id INT REFERENCES songs(id);