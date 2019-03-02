const User = require ('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 const secret = require('../config/keys');
/**
 * register a user in the db
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.register = (req, res, next) => {
  const {
    userName,
    firstName,
    lastName,
    email
  } = req.body;

  let { password } = req.body;
  //check if user already exists
  User.findOne({ userName: userName }).exec((err, user) => {
    if(user){
    let result = bcrypt.compareSync(password, user.password);
      if(!result){
        res.status(401).json({message: 'user already exists'});
      }else if(result){
        let token = jwt.sign({id: user._id}, secret.jwtSecret, {expiresIn: 86400});
        res.status(200).json({message: 'logged in', auth: true, token: token});
      }else{
        throw new Error('database error');
      }
    }else if(!user){
      if(userName && password && email){
       User.create({
         userName: userName, 
         password: password, 
         email: email, 
         firstName: firstName,
         lastName: lastName
         }, (err, user) => {
           if(err) return next(err);
            let token = jwt.sign({id: user._id}, secret.jwtSecret, {expiresIn: 86400});
            res.status(200).json({message: 'logged in', auth: true, token: token, userName: user.userName, id: user._id});
        });
      }
    }
    });
}


/**
 * login a user
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.login = (req, res, next) => {
const {
  userName, 
  password 
} = req.body;

    User.findOne({ userName: userName }).exec((err, user) => {
    if(user){
    let result = bcrypt.compareSync(password, user.password);
      if(!result){
        res.status(401).send('unauthorized');
      }else if(result){
          let token = jwt.sign({id: user._id}, secret.jwtSecret, {expiresIn: 86400});
          res.status(200).json({message: 'logged in', auth: true, token: token, userName: user.userName, id: user._id});
      }else{
        err = new Error('database error');
        next(err);
      }
    }else{
      err = new Error('User not found');
      next(err)
    }
});
}


exports.getUserProfile = (req, res, next) => {
  User.findOne({_id : req.params.id}, 'userName email firstName lastName')
  .exec((err, user) => {
    if(err) next(err);
    res.status(200).json({message: 'user profile found', user: user});
  });
}

/**
 * get list of usernames & status
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.getUserList = (req, res, next) => {
  User.find({}, '_id userName').exec((err, users) => {
    if(err){
      next(err);
    }else{
      res.status(200).json({message: 'list of users', data: users});
    }
  })
}

/**
 * update a user
 * @param req
 * @param res
 * @param next
 * @returns void
 */
exports.updateUser = (req, res, next) => {
  const {
    username,
    firstname,
    lastname,
    email
  } = req.body;
  User.findOneAndUpdate({_id: req.params.id}, {userName: username, email: email, firstName: firstname, lastName: lastname})
  .exec((err, user) => {
    if(err) next(err);
    res.status(200).json({message: 'user successfully updated'})
  })
}