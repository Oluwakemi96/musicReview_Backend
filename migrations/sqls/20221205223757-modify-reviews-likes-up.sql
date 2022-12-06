/* Replace with your SQL commands */
ALTER TABLE reviews_likes
DROP CONSTRAINT reviews_likes_review_id_fkey,
ADD CONSTRAINT reviews_likes_review_id_fkey
    FOREIGN KEY (review_id)
    REFERENCES reviews(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

