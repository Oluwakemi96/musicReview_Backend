/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    song_title TEXT,
    year_of_release INT,
    genre TEXT,
    album_name TEXT,
    artist TEXT, 
    song_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);