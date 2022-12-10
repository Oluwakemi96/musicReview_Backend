import request from 'supertest';
import assert from 'assert';
import app from '../../src/index.js';

describe('welcome users', () => {
  it('should load welcome', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.body.message, 'Welcome to music review backend APIs');
        done();
      });
  });
});

describe('user Auth integration test', () => {
  it('should sign up user one successfully', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'george temitope',
        username: 'george45',
        password: 'george',
        email_address: 'george@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'user registered successfully');
        assert.equal(res.body.data.full_name, 'george temitope');
        assert.equal(res.body.data.username, 'george45');
        assert.equal(res.body.data.staus, 'inactive');
        assert.equal(res.body.data.email_address, 'george@gmail.com');
        assert.equal(res.body.code, 200);
        process.env.MUSIC_REVIEW_VERIFICATION_TOKEN_FOR_USER_ONE = res.body.data.password_token;
        done();
      });
  });
  describe('user Auth integration test', () => {
    it('should sign up user two successfully', (done) => {
      request(app)
        .post('/api/v1/auth/sign_up')
        .send({
          full_name: 'ronke ibitayo',
          username: 'ronke95',
          password: 'ronke',
          email_address: 'ronke@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          assert.equal(res.body.message, 'user registered successfully');
          assert.equal(res.body.data.full_name, 'ronke ibitayo');
          assert.equal(res.body.data.username, 'ronke95');
          assert.equal(res.body.data.staus, 'inactive');
          assert.equal(res.body.data.email_address, 'ronke@gmail.com');
          assert.equal(res.body.code, 200);
          process.env.MUSIC_REVIEW_VERIFICATION_TOKEN_FOR_USER_TWO = res.body.data.password_token;

          done();
        });
    });
  });
});

describe('user auth integration test', () => {
  it('should throw errow when full_name is not sent for user one', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        username: 'george45',
        password: 'george',
        email_address: 'george@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'full_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});
describe('user auth integration test', () => {
  it('should throw errow when email_address is not sent user one', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'george temitope',
        username: 'george45',
        password: 'george',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email_address is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});
describe('user auth integration test', () => {
  it('should throw errow when username is not sent for user one', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'george temitope',
        password: 'george',
        email_address: 'george@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'username is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});
describe('user auth integration test', () => {
  it('should throw errow when password is not sent for user one', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'george temitope',
        username: 'george45',
        email_address: 'george@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'password is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('user auth integration test', () => {
  it('should throw errow when full_name is not sent for user two', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        username: 'ronke95',
        password: 'ronke',
        email_address: 'ronke@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'full_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});
describe('user auth integration test', () => {
  it('should throw errow when username is not sent for user two', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'ronke ibitayo',
        password: 'ronke',
        email_address: 'ronke@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'username is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});
describe('user auth integration test', () => {
  it('should throw errow when password is not sent for user two', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'ronke ibitayo',
        username: 'ronke95',
        email_address: 'ronke@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'password is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('user auth integration test', () => {
  it('should throw errow when email_address is not sent user two', (done) => {
    request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        full_name: 'ronke ibitayo',
        username: 'ronke95',
        password: 'ronke',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email_address is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('verify user one email', () => {
  it('should verify a user email', (done) => {
    request(app)
      .post('/api/v1/auth/user_verification')
      .send({
        token: process.env.MUSIC_REVIEW_VERIFICATION_TOKEN_FOR_USER_ONE,
      })
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'user status updated successfully');
        assert.equal(res.body.code, 200);
        done();
      });
  });
});
describe('verify user two email', () => {
  it('should verify a user email', (done) => {
    request(app)
      .post('/api/v1/auth/user_verification')
      .send({
        token: process.env.MUSIC_REVIEW_VERIFICATION_TOKEN_FOR_USER_TWO,
      })
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'user status updated successfully');
        assert.equal(res.body.code, 200);
        done();
      });
  });
});

describe('verify user email', () => {
  it('should throw error when token is not sent', (done) => {
    request(app)
      .post('/api/v1/auth/user_verification')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'token is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('login user one', () => {
  it('should login user one successfully', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email_address: 'george@gmail.com',
        password: 'george',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'user logged in successfully');
        assert.equal(res.body.data.user.full_name, 'george temitope');
        assert.equal(res.body.data.user.username, 'george45');
        assert.equal(res.body.data.user.staus, 'active');
        assert.equal(res.body.data.user.email_address, 'george@gmail.com');
        process.env.USER_ONE_LOGIN_TOKEN = res.body.data.sessionToken;
        done();
      });
  });
});
