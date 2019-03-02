/**
* Tournament Routes
*/
const authorize = require('../config/authorize');
const express = require('express');
const router = express.Router();
const tournament_controller = require('../controllers/tournamentController');
const team_controller = require('../controllers/teamController');

//Get all public tournaments
router.get('/', tournament_controller.get)


//get all tournaments from a user
router.get('/user', tournament_controller.getUserTournaments)

//Get tournament by id
router.get('/:id', tournament_controller.getById)

//Get tournament by name


//Create new tournament
router.post('/create', authorize, tournament_controller.create);

//subscribeUser to tournament
router.post('/subscribe', authorize, tournament_controller.subscribeUser);

//add team to tournament
router.post('/:tournamentId/team/:teamId', authorize, team_controller.addTeamToTournament);

//delete tournament


module.exports = router;