const Tournament = require('../models/TournamentSchema');
const TournamentTeam = require('../models/TournamentTeam');
const TournamentUser = require('../modules/TournamentUser/TournamentUserSchema');
const Team = require('../models/TeamSchema');


/**
 * get all tournament names
   * @param req
   * @param res
   * @param next
   * @returns void
 */
exports.get = (req, res, next) => {
  Tournament.find({}, 'tournamentName').exec((err, tournaments) => {
    if (err) return next(err);
    res.status(200).json({ message: 'all tournament names and usernames', data: tournaments });
  })
}
/**
 * get a tournament by id -
   * @param req
   * @param res
   * @param next
   * @returns void
 */
exports.getById = (req, res, next) => {
  Tournament.findOne({_id: req.params.id}).exec((err, tournament) => {
    if (err) return next(err);
    res.status(200).json({ message: 'complete tournament info', tournament: tournament });
  })
}
/**
 * get all tournaments from User
   * @param req
   * @param res
   * @param next
   * @returns void
 */
exports.getUserTournaments = (req, res, next) => {
  Tournament.find({ User: req.userId }).exec((err, tournaments) => {
    if (err) return next(err);
    res.status(200).json({ message: 'all tournaments from user', data: tournaments });
  })
}

/**
 * get entire tournament
 * 
 */

/**
 * create a tournament
   * @param req
   * @param res
   * @param next
   * @returns void
 */
exports.create = (req, res, next) => {
  const { tournamentName } = req.body;
  if (!tournamentName) {
    let err = new Error('no tournament name given');
  }
  Tournament.create({
    tournamentName: tournamentName,
    Admin: req.userId
  }, (err, tournament) => {
    if (err) return next(err);
    res.status(200).json({ message: 'tournament created', data: tournament })
  });
}

/**
 * adds a team to the tournament
 * @param req
 * @param res
 * @param next
 * @returns void
 */


/**
 * launch the tournament (create all matches, rounds, groups,...)
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.launchTournament = (req, res, next) => {
  const { tournamentId } = req.body;
  Tournament.findById( tournamentId, (err, tournament) => {
    if (err) { return next(err) }
    else if (tournament.Admin !== req.userId) { res.status(201).json({ message: 'user already subscribed', data: tournamentUser }) }
    else {
      TournamentUser.create({
        User: req.userId,
        Tournament: tournamentId
      }, (err, tournamentUser) => {
        if (err) return next(err);
        res.status(200).json({ message: 'user subscribed to tournament', data: tournamentUser });
      });
    }
  });
}



/** 
 * add a player to the tournament
 * creates a tournament user in the tournamentuser collection
 * adds the tournament user to the tournament
 * @param req
 * @param res
 * @param next
 * @returns void
*/
exports.subscribeUser = (req, res, next) => {
  const { tournamentId } = req.body;
  TournamentUser.findOne({ User: req.userId }, (err, tournamentUser) => {
    if (err) { return next(err) }
    else if (tournamentUser) { res.status(201).json({ message: 'user already subscribed', data: tournamentUser }) }
    else {
      TournamentUser.create({
        User: req.userId,
        Tournament: tournamentId
      }, (err, tournamentUser) => {
        if (err) return next(err);
        res.status(200).json({ message: 'user subscribed to tournament', data: tournamentUser });
      });
    }
  });
}


exports.deleteUser = (req, res, next) => {
  TournamentUser.findOneAndDelete()
}


/**
 * add a team to a tournament
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.addTeam = (req, res, next) => {
  const user = req.userId;
  const {
    teamId,
    tournamentId
  } = req.params;


  if (!teamId) res.json().json({ message: 'no teamId provided' });
  TournamentTeam.create({
    User: user,
    Team: teamId,
    Tournament: tournamentId
  })
}