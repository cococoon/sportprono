const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentTeamSchema = new Schema({
  Tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  Team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  win:{
    type: Number,
    default: null
  },
  loss: {
    type: Number,
    default: null
  },
  draw: {
    type: Number,
    default: null
  }
});

const TournamentTeam = mongoose.model('TournamentTeam', TournamentTeamSchema);

module.exports = TournamentTeam;