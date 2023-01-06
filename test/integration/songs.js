import request from 'supertest';
import assert from 'assert';
import app from '../../src/index.js';

describe('should get all songs', () => {
  it('should get all the songs available', (done) => {
    request(app)
      .get('/api/v1/song/all')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'songs fetched successfully');
        assert.equal(res.body.code, 200);
        done();
      });
  });
});

describe('should search for song by its title', () => {
  it('should search for a particular song by its title', (done) => {
    request(app)
      .get('/api/v1/song/search')
      .query({
        song_title: 'ginger',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song fetched successfully');
        done();
      });
  });
});

describe('should get the details of a particular song', () => {
  it('should get the details of a particular song', (done) => {
    request(app)
      .get('/api/v1/song/details/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song details fetched successfully');
        done();
      });
  });
  it('should get the details of a particular song', (done) => {
    request(app)
      .get('/api/v1/song/details/2')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song details fetched successfully');
        done();
      });
  });
  it('should throw error if invalid token is entered for user one', (done) => {
    request(app)
      .get('/api/v1/song/details/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hdjhfgdd`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
  it('should throw error if invalid token is entered for user two', (done) => {
    request(app)
      .get('/api/v1/song/details/2')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}hdjhffhf`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
  it('should throw error if song id is not sent for user one', (done) => {
    request(app)
      .get('/api/v1/song/details')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.label, 'NOT_FOUND');
        assert.equal(res.body.message, 'Route not found');
        assert.equal(res.body.code, 404);
        done();
      });
  });
  it('should throw error if song id is not sent for user two', (done) => {
    request(app)
      .get('/api/v1/song/details')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.label, 'NOT_FOUND');
        assert.equal(res.body.message, 'Route not found');
        assert.equal(res.body.code, 404);
        done();
      });
  });
});

describe('should like a particular song', () => {
  it('user one should like a particular song successfully', (done) => {
    request(app)
      .post('/api/v1/song/like/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song liked successfully');
        done();
      });
  });
  it('user two should like a particular song successfully', (done) => {
    request(app)
      .post('/api/v1/song/like/2')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song liked successfully');
        done();
      });
  });
});
describe('should dislike a particular song', () => {
  it('user one should dislike a particular song successfully', (done) => {
    request(app)
      .post('/api/v1/song/dislike/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song disliked successfully');
        done();
      });
  });
});

describe('rate a song', () => {
  it('rate a particular song', (done) => {
    request(app)
      .post('/api/v1/song/rate/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .send({
        rating: '4',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song rated successfully');
        done();
      });
  });
  it('should throw error if invalid token is sent', (done) => {
    request(app)
      .post('/api/v1/song/rate/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfgfgdhgdg`,
      })
      .send({
        rating: '4',
      })
    //   .set('Content-Type', 'application/json')
    //   .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('review a particular song', () => {
  it('user one should review a particular song successfully', (done) => {
    request(app)
      .post('/api/v1/song/review/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .send({
        review: 'an interesting and lovely song',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song reviewed successfully');
        done();
      });
  });
  it(' should throw error when an invalid token is sent', (done) => {
    request(app)
      .post('/api/v1/song/review/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .send({
        review: 'an interesting and lovely song',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('like a song review', () => {
  it('should like a particular song review', (done) => {
    request(app)
      .post('/api/v1/song/like_review/2/1')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'review liked successfully');
        done();
      });
  });
  it(' should throw error when an invalid token is sent', (done) => {
    request(app)
      .post('/api/v1/song/like_review/2/1')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('fetch a song review', () => {
  it('should fetch the review of a particular song', (done) => {
    request(app)
      .get('/api/v1/song/song_reviews/3')
      .set({
        Authorization: `Bearer ${process.env.USER_TWO_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song review fetched successfully');
        done();
      });
  });
  it(' should throw error when an invalid token is sent', (done) => {
    request(app)
      .get('/api/v1/song/song_reviews/3')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('fetch users who like a particular song', () => {
  it('should fetch the users that like a particular song', (done) => {
    request(app)
      .get('/api/v1/song/users_likes/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'users fetched successfully');
        done();
      });
  });
  it('should throw error when an invalid token is sent', (done) => {
    request(app)
      .get('/api/v1/song/users_likes/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('fetch users that dislike a particular song', () => {
  it('should fetch users that dislike a particular song', (done) => {
    request(app)
      .get('/api/v1/song/users_dislikes/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'users fetched successfully');
        done();
      });
  });
  it('should throw error when an invalid token is sent', (done) => {
    request(app)
      .get('/api/v1/song/users_dislikes/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('fetch users that like a review', () => {
  it('should fetch users that like a particular review', (done) => {
    request(app)
      .get('/api/v1/song/users_reviewLikes/2/1')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'users fetched successfully');
        done();
      });
  });
  it('should throw error when an invalid token is sent', (done) => {
    request(app)
      .get('/api/v1/song/users_reviewLikes/2/1')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}hfhjfhgfgh`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'Unauthorized access.');
        done();
      });
  });
});

describe('delete the review of a particular user', () => {
  it('should delete the review of a particular user', (done) => {
    request(app)
      .delete('/api/v1/song/delete_review/1/2')
      .set({
        Authorization: `Bearer ${process.env.USER_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'review is not available for this song');
        done();
      });
  });
});
