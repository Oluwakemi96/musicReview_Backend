/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS reviews_likes(
    id SERIAL PRIMARY KEY,
    review_id INT REFERENCES reviews(id),
    user_id INT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);