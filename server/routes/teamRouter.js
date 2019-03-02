const express = require('express');
const teamRouter = express.Router();
const teamController = require('../controllers/teamController');
const authorize = require('../config/authorize');

/**
 * Get all teams and names of users that created them
 */
teamRouter.get('/', teamController.getAll);

/**
 * route to get all teams from user
 */
teamRouter.get('/user', authorize, teamController.getTeamsFromUser);

/**
 * Route for creating a team
 */
teamRouter.post('/create', authorize, teamController.create);

/**
 * get a user's teams
 */
//teamRouter.get('/update', authorize, teamController.update);

teamRouter.get('/test', authorize, (req, res, send) => {
  res.status(200).json({message: 'you are logged in', userId: req.userId})
});


module.exports = teamRouter;