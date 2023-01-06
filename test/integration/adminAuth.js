import request from 'supertest';
import assert from 'assert';
import app from '../../src/index.js';

describe('login super admin', () => {
  it('should login superadmin', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/login')
      .send({
        email: 'rashidats@enyata.com',
        password: 'rashidat',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin logged in successfully');
        process.env.ADMIN_LOGIN_TOKEN = res.body.data.sessionToken;
        done();
      });
  });
});

describe('create admins', () => {
  it('should create admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Kolade',
        last_name: 'Oyedepo',
        email: 'kolade@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin created successfully');
        process.env.ADMIN_TWO_EMAIL = res.body.data.email;
        process.env.ADMIN_ONE_CREATE_PASSWORD_TOKEN = res.body.data.password_token;
        done();
      });
  });
  it('should create admin two', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Jemilat',
        last_name: 'Abubakar',
        email: 'abubakar@gmail.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin created successfully');
        process.env.ADMIN_TWO_EMAIL = res.body.data.email;
        process.env.ADMIN_TWO_CREATE_PASSWORD_TOKEN = res.body.data.password_token;
        done();
      });
  });
  it('should throw error when invalid token is sent for admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}hdghdgfdf`,
      })
      .send({
        first_name: 'Kolade',
        last_name: 'Oyedepo',
        email: 'kolade@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNAUTHORIZED');
        assert.equal(res.body.message, 'unauthorized access');
        assert.equal(res.body.code, 401);
        done();
      });
  });
  it('should throw error when invalid token is sent for admin two', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}jehhgrg`,
      })
      .send({
        first_name: 'Jemilat',
        last_name: 'Abubakar',
        email: 'abubakar@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNAUTHORIZED');
        assert.equal(res.body.message, 'unauthorized access');
        assert.equal(res.body.code, 401);
        done();
      });
  });
  it('should throw error when first name is not sent for admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        last_name: 'Oyedepo',
        email: 'kolade@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'first_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error when last name is not sent for admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Kolade',
        email: 'kolade@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'last_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error when email is not sent for admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Kolade',
        last_name: 'Oyedepo',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error when first name is not sent for admin two', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        last_name: 'Abubakar',
        email: 'abubakar@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'first_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error when last name is not sent for admin two', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Jemilat',
        email: 'abubakar@gmail.com',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'last_name is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error when email is not sent for admin one', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin')
      .set({
        Authorization: `Bearer ${process.env.ADMIN_LOGIN_TOKEN}`,
      })
      .send({
        first_name: 'Jemilat',
        last_name: 'Abubakar',
      })
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('create password for admin one', () => {
  it('should create admin one password', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin_password')
      .send({
        password: 'kolade',
        password_token: process.env.ADMIN_ONE_CREATE_PASSWORD_TOKEN,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin updated successfully');
        done();
      });
  });
  it('should create admin two password', (done) => {
    request(app)
      .post('/api/v1/admin/create_admin_password')
      .send({
        password: 'jemilat',
        password_token: process.env.ADMIN_TWO_CREATE_PASSWORD_TOKEN,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'admin updated successfully');
        done();
      });
  });
});

describe('login a regular admin', () => {
  it('should login regular admin one', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/login')
      .send({
        email: 'kolade@gmail.com',
        password: 'kolade',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'admin logged in successfully');
        process.env.REGULAR_ADMIN_ONE_LOGIN_TOKEN = res.body.data.sessionToken;
        done();
      });
  });
  it('should login regular admin two', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/login')
      .send({
        email: 'abubakar@gmail.com',
        password: 'jemilat',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log(res.body);
        assert.equal(res.body.message, 'admin logged in successfully');
        process.env.REGULAR_ADMIN_TWO_LOGIN_TOKEN = res.body.data.sessionToken;
        done();
      });
  });
  it('should throw error if email is not sent', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/login')
      .send({
        password: 'rashidat',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
  it('should throw error if password is not sent', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/login')
      .send({
        email: 'rashidats@enyata.com',
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

describe('should send a reset password mail for an admin', () => {
  it('should send an admin a reset password mail', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/forgot_password')
      .send({
        email: 'rashidats@enyata.com',
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'link to reset your password has been sent to your mail');
        process.env.ADMIN_PASSWORD_RESET_TOKEN = res.body.data;
        done();
      });
  });
  it('should throw error when email is not sent', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/forgot_password')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.status, 'error');
        assert.equal(res.body.error, 'UNPROCESSABLE_ENTITY');
        assert.equal(res.body.message, 'email is required');
        assert.equal(res.body.code, 422);
        done();
      });
  });
});

describe('reset admin password', () => {
  it('should reset an admin password', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/reset_password')
      .send({
        password: 'rashy',
        token: process.env.ADMIN_PASSWORD_RESET_TOKEN,
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.equal(res.body.message, 'password updated successfully');
        done();
      });
  });
  it('should throw an error when password is not sent', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/reset_password')
      .send({
        token: process.env.ADMIN_PASSWORD_RESET_TOKEN,
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
  it('should throw an error when token is not sent', (done) => {
    request(app)
      .post('/api/v1/admin/Auth/reset_password')
      .send({
        password: 'rashy',
      })
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
