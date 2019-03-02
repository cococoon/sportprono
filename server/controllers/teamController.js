const Team = require('../models/TeamSchema');
const User = require('../models/UserSchema');
const TournamentTeam = require('../models/TournamentTeam');
const Tournament = require('../models/TournamentSchema');

/**
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.getAll = function (req, res, next) {
  Team.find({}, 'teamName')
    .populate('user', 'userName')
    .exec((err, teams) => {
      if (err) return next(err);
      res.json({ message: 'all teams and their creators', data: teams });
    })
}

/**
 * FIND ALL TEAMS FROM USER
 * @param req
 * @param res
 * @returns void
 */
exports.getTeamsFromUser = (req, res, next) => {
    if (req.userId) {
        //store team id in variable
        Team.find({}, 'teamName')
            .populate({
                path: 'User',
                match: { '_id': req.userId },
                select: 'userName'
            })
            .exec((err, teams) => {
                if (err) return next(err);
                let result = teams.filter((team) => {
                    if (team.User !== null) {
                        return true;
                    }
                });
                res.status(200).json({ message: 'teams found', data: result });
            });
    } else {
        res.status(401).json({ message: 'unauthorized', data: null })
    }
}
/**
* @param req
* @param res
* @param next
* @returns void
*/
exports.create = function (req, res, next) {
  const userId = req.userId;
  const {
    teamName
  } = req.body;
  if (!userId || !teamName) {
    let err = new Error('No teamname or userId provided');
    return next(err);
  }
  Team.create({
    teamName: teamName,
    User: userId
  }, (err, team) => {
    if (err) return next(err);
    res.json({ message: 'team created in db', data: team });
  })
}
/**
* adds a team to the tournament
* @param req
* @param res
* @param next
* @returns void
*/
exports.addTeamToTournament = (req, res, next) => {
  const {
    tournamentId,
    teamId
  } = req.body;
  const userId = req.userId;

  //check if tournament admin is user
  Tournament.findById(
    tournamentId,
    (err, tournament) => {
      if (err) {
        return next(err);
      } else if (tournament.Admin != req.userId) {
        res.status(401).json({message: 'you are not the owner of this tournament', data: tournament.Admin, user: userId});
      } else {
        TournamentTeam.create({
          Tournament: tournamentId,
          Team: teamId
        }, (err, tournamentTeam) => {
            if (err) return next(err);
            res.status(200).json({ message: 'team added to tournament', data: tournamentTeam })
          });

      }
    });

}