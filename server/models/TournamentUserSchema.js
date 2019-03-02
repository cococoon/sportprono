const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentUserSchema = new Schema({
  Tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    default: null
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    
  },
  role: {
    type: String,
    required: true,
    default: 'player'
  },
  hasPaid: {
    type: Boolean,
    required: true,
    default: false
  }
});

const TournamentUser = mongoose.model('TournamentUser', TournamentUserSchema);

module.exports = TournamentUser;