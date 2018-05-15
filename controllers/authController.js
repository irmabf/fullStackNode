const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out!');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  //first check if the user is authenticated 
  if(req.isAuthenticated()){
    next(); //They are logged in, go on
    return;
  }
  req.flash('err', 'Oops you must be logged in to do that');
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  //1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if(!user) {
    req.flash('error', 'No account with that email exists');
    return res.redirect('/login');
  }
  //2. Set reset  tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; //1hour from now
  await user.save();
  //3. Send them an email with the token
  const resetURL = `http://${req.headers.host}.account/reset/${user.resetPasswordToken}`;
  req.flash('success', `You have been emailed a password reset link. ${resetURL}`);
  //4. Redirect to login page
  res.redirect('/login');
}