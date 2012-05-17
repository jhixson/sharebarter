var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var User = new Schema({
    email         : { type: String, required: true }
  , displayName   : { type: String, required: true }
  , password      : { type: String, required: true }
  , profilePic    : { type: String, required: false }
  , quip          : { type: String, required: false }
  , zip           : { type: String, required: false }
  , skill         : { type: String, required: false }
});

mongoose.model('User', User);

exports.User = function(db) {
  return db.model('User');
};
