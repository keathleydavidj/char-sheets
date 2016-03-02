var mongoose = require('mongoose'),
  User = require('./user'),
  Character = require('./character');

var campaignSchema = mongoose.Schema({
  gameMaster: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  charSheets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Character'}],
});

module.exports = mongoose.model('Campaign', campaignSchema);
