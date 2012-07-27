
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var fs = require('fs');

//mongoose.connect('mongodb://localhost/test');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');

var User = require('../models.js').User(mongoose);

exports.index = function(req, res) {
  User.find(function(err, users) {
    //res.send(users);
    res.render('index', { title: 'Share Barter - Find web pros in your area', users: users });
  });
};

exports.register = function(req, res) {
  console.log(req.body);
  var user = new User({ email: req.body.email, displayName: req.body.displayName });

  // hash the user's password and save them to the db
  if(req.body.password == req.body.confirm_password) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            user.password = hash;
            user.save(function(err) {
              console.log('user saved: ' + user._id);
              req.session.user = user._id;
              res.render('signup_additional', { title: 'Share Barter - Sign Up' });
            });
        });
    });
  }
  else
    res.render('index', { title: 'Share Barter', err: 'Passwords do not match.' });
};

exports.signup = function(req, res) {
  res.render('signup', { title: 'Share Barter - Sign Up' });
};

exports.finish = function(req, res) {
  // update the user's profile... then render the map
  console.log("FILES: " + req.files);
  if(req.session.user) {
    User.findOne({ _id: req.session.user}, function (err, doc) {
      doc.quip = req.body.quip;
      doc.zip = req.body.zip;
      doc.skill = req.body.skill;
      doc.lat = req.body.lat;
      doc.lng = req.body.lng;

      var tmp_path = req.files.profilePic.path;
      console.log(tmp_path);
      var pic = doc._id + '_' + req.files.profilePic.name;
      var target_path = '/Users/hixsonj/Projects/sharebarter/public/uploads/' + pic;
      if(process.env.NODE_ENV == 'production')
        target_path = '/app/public/uploads/' + pic;
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
          if (err) throw err;
          doc.profilePic = pic;
          doc.save(function(err) {
            res.render('index', { title: 'Share Barter - Find web pros in your area' });
          });
        });
      });
    });
  }
  else
    res.render('index', { title: 'Share Barter - Find web pros in your area' });
};

exports.login = function(req, res) {
  User.findOne({ email: req.body.email}, function (err, doc) {
    bcrypt.compare("B4c0/\/", hash, function(err, res) {
      if(res) {
        req.session.user = doc._id;
      }
      else {
        console.log('wrong email/password');
      }
    });
  });
};
