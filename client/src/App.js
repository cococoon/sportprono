/**
 * COMPONENT IMPORTS
 */
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import Tournament from './components/Tournament';
import TournamentWizard from './components/TournamentWizard';
import TeamWizard from './components/TeamWizard';

/**
 * STYLESHEET IMPORTS
 */
import './App.scss';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css'
import '../node_modules/animate.css';
import '../node_modules/normalize.css/normalize.css';

/**
 * App Component
 */
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {}
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(username, password) {
    axios.post('https://sportsprono--cococoon.repl.co/user/login', {
      userName: username,
      password: password
    }).then((response) => {
      this.setState({
        user: {
          id: response.data.id,
          userName: response.data.userName,
          token: response.data.token,
          auth: true
        }
      });
      localStorage.setItem('token', response.data.token);
    })
  }

  handleLogout() {
    this.setState({
      user: null
    })
    localStorage.removeItem('token');
  }

  handleSignup(username, password, email) {
    axios.post('https://sportsprono--cococoon.repl.co/user/register', {
      userName: username,
      password: password,
      email: email
    }).then((response) => {
      this.setState({
        user: {
          id: response.data._id,
          userName: response.data.userName,
          token: response.data.token,
          auth: true
        }
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>
          <Route
            exact
            path="/"
            render={
              () => {
                return (
                  <Home user={this.state.user} tournaments={this.state.tournaments} />
                )
              }
            }
          />
          <Route
            path="/login"
            render={
              () => {
                return (
                  <Login handleLogin={this.handleLogin} user={this.state.user} />
                )
              }} />
          <Route
            path="/signup"
            render={
              () => {
                return (
                  <SignUp handleSignup={this.handleSignup} />
                )
              }
            }
          />
          <Route
            exact
            path="/profile/:id"
            render={
              (props) => {
                return (
                  <UserProfile user={this.state.user} {...props} />
                )
              }
            }
          />

          <Route
            exact
            path="/tournament/:id"
            render={
              (props) => {
                return (
                  <Tournament {...props} />
                )
              }
            }
          />
          <Route
            exact
            path="/createprono"
            render={
              (props) => {
                return (
                  <TournamentWizard user={this.state.user} {...props} />
                )
              }
            }
          />
          <Route
            exact
            path="/teamwizard"
            render={
              (props) => {
                return (
                  <TeamWizard user={this.state.user} {...props} />
                )
              }
            }
          />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
