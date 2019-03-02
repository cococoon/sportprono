const Match = require('MatchSchema');
const MatchResult = require('MatchResultSchema');

/**
 * creates a match in the database
 * @param homeTeamId
 * @param awayTeamId
 * @param userId
 * @param tournamenteId
 * @returns match record
 */

exports.create = (homeTeamId, awayTeamId, userId, tournamentId) => {
  if(homeTeamId && awayTeamId){
  Match.create({
    Tournament: tournamentId,
    User: userId,
    HomeTeam: homeTeamId,
    AwayTeam: awayTeamId
  }, (err, match) => {
    if(err) return next(err);
    return match;
  })
  }else{
  Match.create({
    Tournament: tournamentId,
    User: userId
  })
  }

}

exports.editTeam = (newName, user) => {
  
}

exports.editDate = (Date) => {

}