var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Campaign = require('./campaign');

var userSchema = mongoose.Schema({

  handle: String,
  local: {
    email: String,
    password: String,
  },
  campaigns: [{type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'}],
  characters: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}]

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
