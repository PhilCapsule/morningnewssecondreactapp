var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var userModel = require('../models/users') /* chargement du modele users */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async function(req, res) {
  console.log('req.body', req.body);
  var newUser = await userModel.findOne({userMail: req.body.emailFromFront});
  if(newUser === null && req.body.usernameFromFront !== "undefined" && req.body.emailFromFront !== "undefined" && req.body.passwordFromFront !== "undefined") {
    var newUser = new userModel({
      userName:req.body.usernameFromFront,
      userMail:req.body.emailFromFront,
      userPsw:req.body.passwordFromFront
    });
    await newUser.save();
    res.json({result: true});
  } else {
    res.json({result: false});
  }
})

router.post('/sign-in', async (req, res) => {
  console.log('req.body', req.body);
  var loginUser = await userModel.findOne({userMail: req.body.emailFromFront});
  if(loginUser !== null && loginUser.userPsw === req.body.passwordFromFront && req.body.emailFromFront !== "undefined" && req.body.passwordFromFront !== "undefined") {
    res.json({result: true});
  } else {
    res.json({result: false});
  }
})

module.exports = router;
