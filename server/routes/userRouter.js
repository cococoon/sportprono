const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authorize = require('../config/authorize');

/**
 * USER ROUTES
 */

//get all user names
userRouter.get('/', userController.getUserList);


//get user profile
userRouter.get('/:id', userController.getUserProfile);

//update a user profile
userRouter.put('/:id/edit', authorize, userController.updateUser);

//login user
userRouter.post('/login', userController.login);


//register user
userRouter.post('/register', userController.register);

module.exports = userRouter;