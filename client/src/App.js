import { BrowserRouter, Route, NavLink, Switch, Redirect } from 'ReactRouterDOM';
const BASEURL = 'https://sportsprono.cococoon.repl.co';
const Router = BrowserRouter;
const Link = NavLink;

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
      //localstorage.setItem('token', response.data.token);
    })
  }
  handleLogout() {
    this.setState({
      user: null
    })
  }
  handleSignup(username, password, email) {
    let token;
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
                  <TournamentWizard token={this.state.user.token} {...props} />
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
