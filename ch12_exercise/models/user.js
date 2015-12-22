var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },    
  name: {
      type: String,
      required: true
  },
  email: {
      type: String
  }
});

module.exports = mongoose.model('User', UserSchema);
