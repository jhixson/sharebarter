var mongoose = require('mongoose');

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var User = new Schema({
    email         : { type: String, required: true }
  , displayName   : { type: String, required: true }
  , password      : { type: String, required: true }
});

mongoose.model('User', User);

exports.User = function(db) {
  return db.model('User');
};