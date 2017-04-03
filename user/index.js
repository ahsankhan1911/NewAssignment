var express = require('express');
var router = express.Router();
var user = require('./controller');


router.post('/create-user' , user.createUser);

router.post('/login-user', user.logInUser);

router.get('/user-profile/:email', user.userProfile);



module.exports = router;

