const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  tournamentName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'TournamentTeam',
    default: null
  }],
  Admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }]
});

const Tournament = mongoose.model('Tournament', TournamentSchema);

module.exports = Tournament;