var mongoose = require('mongoose'),
  User = require('./user');

// var skill = {
//     score: Number,
//     prof: {type: Boolean, default: false}
// };

var characterSchema = new mongoose.Schema({
  name: String,
  player: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  charClass: String,
  race: String,
  alignment: String,
  xp: {type: Number, default: 0},
  avatarUrl: String,
  stats: {
    str: Number,
    dex: Number,
    const: Number,
    int: Number,
    wis: Number,
    char: Number
  },
  inspire: Number,
  profBonus: Number,
  // saving: {
  //   str: skill,
  //   dex: skill,
  //   const: skill,
  //   int: skill,
  //   wis: skill,
  //   char: skill
  // },
  // skills: {
  //   acrobatics: skill,
  //   animal: skill,
  //   arcana: skill,
  //   athletics: skill,
  //   deception: skill,
  //   history: skill,
  //   insight: skill,
  //   intimidation: skill,
  //   investigation: skill,
  //   medicine: skill,
  //   nature: skill,
  //   perception: skill,
  //   performance: skill,
  //   persuasion: skill,
  //   religion: skill,
  //   slight: skill,
  //   stealth: skill,
  //   survival: skill
  // },
  armorClass: Number,
  initative: Number,
  speed: Number,
  hp: {
    max: Number,
    current: Number,
    Temporary: Number
  },
  hitDie: {
    die: String,
    avail: Number
  },
  dSaves: {
    success: {type: Number, default: 0},
    fail: {type: Number, default: 0}
  },
  created_at: Date,
  updated_at: Date
});

var Character = mongoose.model('Character', characterSchema);

// Make this available to our other files
module.exports = Character;
