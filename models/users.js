var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userName:String,
  userMail:String,
  userPsw:String
})

module.exports = mongoose.model('users', userSchema);