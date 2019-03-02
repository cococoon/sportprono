const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

const teamRouter = require('./routes/teamRouter');
const userRouter = require('./routes/userRouter');
const tournamentRouter = require('./routes/tournamentRouter');

mongoose.connect(`mongodb://${keys.dbUser}:${keys.dbPass}@ds119802.mlab.com:19802/sportsprono-work`, { useNewUrlParser: true });


app.use(cors());
app.use(session({
  secret: 'snorfiets',
  cookie: {
    maxAge: 6000,
    resave: true
  }
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/team', teamRouter);
app.use('/user', userRouter);
app.use('/tournament', tournamentRouter);

/**
 * error handler middleware
 */
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
})

app.get('/', (req, res) => {
  res.status(200).send('api running');
})

/**
 * 404 if route doesn't exist
 * @param req
 * @param res
 * @param next
 * @returns void
 */
app.get('*', (req, res, next) => {
  let err = new Error('Page not found');
  err.statusCode = 404;
  next(err);
})

app.listen(PORT, console.log(`server listening on port ${PORT}`));