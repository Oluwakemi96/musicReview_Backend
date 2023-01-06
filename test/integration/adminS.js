import request from 'supertest';
import assert from 'assert';
import app from '../../src/index';

describe('deactivate an admin', () => {
  it('should deactivate first admin', (done) => {
    request(app)
      .patch('/api/v1/admin/deactivate_admin/2')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        status: 'deactivated',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin deactivated successfully');
        done();
      });
  });
});
describe('suspend an admin', () => {
  it('should suspend first admin', (done) => {
    request(app)
      .patch('/api/v1/admin/suspend_admin/2')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        status: 'suspended',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin suspended successfully');
        done();
      });
  });
});
describe('add new songs', () => {
  it('should throw error when admin is deactivated or suspended', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.REGULAR_ADMIN_ONE_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        genre: 'blues',
        album_name: 'love',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'FORBIDDEN');
        assert.equal(res.body.message, 'Access denied, contact support');
        assert.equal(res.body.code, 403);
        done();
      });
  });
  it('should add first new songs', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        genre: 'blues',
        album_name: 'love',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song added successfully');
        done();
      });
  });
  it('should add second new songs', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        year_of_release: '2018',
        genre: 'hip hop',
        album_name: 'zombie',
        artist: 'tecno',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song added successfully');
        done();
      });
  });
  it('should throw error when song title is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        year_of_release: '2020',
        genre: 'blues',
        album_name: 'love',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'song_title is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when year of release is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        genre: 'blues',
        album_name: 'love',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'year_of_release is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when genre is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        album_name: 'love',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'genre is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when album name is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        genre: 'blues',
        artist: 'simi',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'album_name is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when artist is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        genre: 'blues',
        album_name: 'love',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'artist is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when song_link is not passed for first song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'Duduke',
        year_of_release: '2020',
        genre: 'blues',
        album_name: 'love',
        artist: 'simi',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'song_link is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when song title is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        year_of_release: '2018',
        genre: 'hip hop',
        album_name: 'zombie',
        artist: 'tecno',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'song_title is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when year of release is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        genre: 'hip hop',
        album_name: 'zombie',
        artist: 'tecno',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'year_of_release is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when genre is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        year_of_release: '2018',
        album_name: 'zombie',
        artist: 'tecno',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'genre is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when album name is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        year_of_release: '2018',
        genre: 'hip hop',
        artist: 'tecno',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'album_name is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when artist is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        year_of_release: '2018',
        genre: 'hip hop',
        album_name: 'zombie',
        song_link: 'http://networld_zombie.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'artist is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
  it('should throw error when song_link is not passed for second song', (done) => {
    request(app)
      .post('/api/v1/admin/add_songs')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        song_title: 'pana',
        year_of_release: '2018',
        genre: 'hip hop',
        album_name: 'zombie',
        artist: 'tecno',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'song_link is required');
        assert.equal(res.body.status, 'error');
        done();
      });
  });
});

describe('reactivate an admin', () => {
  it('should reactivate first admin', (done) => {
    request(app)
      .patch('/api/v1/admin/reactivate_admin/2')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        status: 'active',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin reactivated successfully');
        done();
      });
  });
  it('should throw error when status is not sent', (done) => {
    request(app)
      .patch('/api/v1/admin/reactivate_admin/2')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'status is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('delete a song', () => {
  it('should delete a particular song', (done) => {
    request(app)
      .delete('/api/v1/admin/delete_song/1')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'song deleted successfully');
        done();
      });
  });
});

describe('edit song', () => {
  it('should edit a particular song', (done) => {
    request(app)
      .put('/api/v1/admin/edit_song/2')
      .set({
        Authorization: `Bearer ${process.env.REGULAR_ADMIN_ONE_LOGIN_TOKEN}`,
      })
      .send({
        year_of_release: '2019',
      })
      .end((err, res) => {
        assert.equal(res.body.message, 'song updated successfully');
        done();
      });
  });
});

describe('fetch all songs', () => {
  it('should fetch all the songs', (done) => {
    request(app)
      .get('/api/v1/admin/all_songs')
      .set({
        Authorization: `Bearer ${process.env.REGULAR_ADMIN_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'songs fetched successfully');
        done();
      });
  });
});

describe('search for a song by its genre by an admin', () => {
  it('admin should fetch a song by its genre', (done) => {
    request(app)
      .get('/api/v1/admin/song_genre')
      .query({
        genre: 'raggae',
      })
      .set({
        Authorization: `Bearer ${process.env.REGULAR_ADMIN_ONE_LOGIN_TOKEN}`,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'songs fetched successfully');
        done();
      });
  });
});
