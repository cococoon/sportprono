const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
	teamName: {
		type: String,
		required: true,
		trim: true
	},
	createdOn: {
		type: Date,
		default: Date.now(),
    required: true
	},
	User: {
		type: Schema.Types.ObjectId,
		ref: 'User',
    required: true
	}
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;