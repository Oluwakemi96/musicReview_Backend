/* Replace with your SQL commands */
ALTER TABLE ratings
DROP CONSTRAINT ratings_song_id_fkey,
ADD CONSTRAINT ratings_song_id_fkey
    FOREIGN KEY (song_id)
    REFERENCES songs(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;


ALTER TABLE reviews
DROP CONSTRAINT reviews_song_id_fkey,
ADD CONSTRAINT reviews_song_id_fkey
    FOREIGN KEY (song_id)
    REFERENCES songs(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE reviews_likes
DROP CONSTRAINT reviews_likes_song_id_fkey,
ADD CONSTRAINT reviews_likes_song_id_fkey
    FOREIGN KEY (song_id)
    REFERENCES songs(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE song_dislikes
DROP CONSTRAINT song_dislikes_song_id_fkey,
ADD CONSTRAINT song_dislikes_song_id_fkey
    FOREIGN KEY (song_id)
    REFERENCES songs(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE song_likes
DROP CONSTRAINT song_likes_song_id_fkey,
ADD CONSTRAINT song_likes_song_id_fkey
    FOREIGN KEY (song_id)
    REFERENCES songs(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;



