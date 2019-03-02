const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
	Time: {
		type: Date,
    default: Date.now();
	},
	Admin: {
		type: Schema.Types.ObjectId,
		ref: 'Admin',
    required: true
	},
	HomeTeam: {
		type: Schema.Types.ObjectId,
		ref: 'TournamentTeam'
	},
	AwayTeam: {
		type: Schema.Types.ObjectId,
		ref: 'TournamentTeam'
	},
  Result: [{
    type: Schema.Types.ObjectId,
    ref: 'Result',
    default: null,
    required: true
  }]
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = Match;