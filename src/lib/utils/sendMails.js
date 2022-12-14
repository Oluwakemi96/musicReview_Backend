/* eslint-disable consistent-return */
import nodemailer from 'nodemailer';
import config from '../../config/index.js';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: config.MUSIC_REVIEW_MAIL_USERNAME,
    pass: config.MUSIC_REVIEW_MAIL_PASSWORD,
    clientId: config.MUSIC_REVIEW_OAUTH_CLIENTID,
    clientSecret: config.MUSIC_REVIEW_OAUTH_CLIENT_SECRET,
    refreshToken: config.MUSIC_REVIEW_OAUTH_REFRESH_TOKEN,
  },
});

const sendSignUp = (to, url) => {
  const mailOptions = {
    from: 'mimicaskesnmore@gmail.com',
    to,
    subject: 'Verify Email Address',
    text: `Welcome to Enyata Music app where you listen to seamless music! Search for your favorite song and enjoy.. click on this link ${url} to verify your email and complete your signup process`,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return err;
    }
  });
};

const resetPassword = (to, url) => {
  const mailOptions = {
    from: 'mimicaskesnmore@gmail.com',
    to,
    subject: 'Password Reset',
    text: `kindly click on this link ${url} to reset your password or you copy and paste on your website`,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return err;
    }
  });
};

const passwordUpdated = (to) => {
  const mailOptions = {
    from: 'mimicaskesnmore@gmail.com',
    to,
    subject: 'Password Reset Successful',
    text: 'You have successfully reset your password, kindly login with your new password',
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return err;
    }
  });
};
const updateAdmin = (to, url) => {
  const mailOptions = {
    from: 'mimicaskesnmore@gmail.com',
    to,
    subject: 'Create Password',
    text: `An admin account has been created for you, kindly click on this link ${url} to create your password`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return err;
    }
  });
};
export default {
  sendSignUp,
  resetPassword,
  passwordUpdated,
  updateAdmin,
};
