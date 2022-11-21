/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    review TEXT,
    user_id INT REFERENCES users(id),
    song_id INT REFERENCES songs(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);