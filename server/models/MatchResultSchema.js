const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchResultSchema = new Schema({
	User: {
		type: Schema.Types.ObjectId,
		ref: 'User',
    required: true
	},
	homeScore: {
		type: Schema.Types.ObjectId,
		ref: 'Team',
    required: true
	},
	awayScore: {
		type: Schema.Types.ObjectId,
		ref: 'Team',
    required: true
	}
});

const MatchResult = mongoose.model('Match', MatchResultSchema);

module.exports = MatchResult;