
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');  

mongoose.connect('mongodb://localhost/test');
var User = require('../models.js').User(mongoose);

exports.index = function(req, res) {
  //var u = User.findOne({ displayName: 'Jesse'}, function (err, doc){
    res.render('index', { title: 'ShareBarter' });
  //});
  
};

exports.register = function(req, res) {
  console.log(req.body);
  var user = new User({ email: req.body.email, displayName: req.body.displayName });

  if(req.body.password == req.body.confirm_password) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            user.password = hash;
            user.save(function(err) {
              console.log('user saved');
              res.render('search', { title: 'ShareBarter - Search' });
            });
        });
    });
  }
  else
    res.render('index', { title: 'ShareBarter', err: 'Passwords do not match.' });
};

exports.search = function(req, res) {
  res.render('search', { title: 'ShareBarter - Search' });
};