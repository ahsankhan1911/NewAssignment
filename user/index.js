var express = require('express');
var router = express.Router();
var user = require('./controller');
// var passport = require('passport');



//middleware and handler  both used

router.post('/create-user' , user.createUser ,user.showUser);

router.post('/login-user', user.logInUser);

router.get('/user-profile/:email', user.userProfile);

//router.post('/show-user', user.showUser);

//router.post('/validate-user', user.showUser);

//
// router.post('/login-user',user.logInUser ,passport.authenticate('local', { successRedirect: '/login-success', failureRedirect: '/login-failed'}));
//
// router.post('/login-success', function (req, res) {
//     res.send("Login Success");
//
// });
//
// router.post('/login-failed', function (req, res) {
//
//     res.send("Login Failed");
//
// });

module.exports = router;

