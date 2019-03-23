import React from 'react';
import { NavLink } from 'react-router-dom';
const Link = NavLink;

export default class NavBar extends React.Component {
    render() {
        let user = this.props.user;
        if (!this.props.user || localStorage.getItem('token')) {
            localStorage.getItem('token')
            return (
                <React.Fragment>
                    <nav className="navbar">
                        <div className="navbar-content">
                            <Link style={{ textDecoration: 'none' }} to="/"><i className="logo fas fa-futbol"></i></Link>
                            <ul className="main-nav">
                                <Link style={{ textDecoration: 'none' }} to="/signup"><li className="signupbutton">Sign Up</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/login"><li className="loginbutton">Login</li></Link>
                            </ul>
                        </div>
                    </nav>
                </React.Fragment>
            )
            //check if user is already logged in
        } else if (this.props.user || localStorage.getItem('token')) {
            console.log(localStorage.getItem('token'))
            return (
                <React.Fragment>
                    <nav className="navbar">
                        <div className="navbar-content">
                            <Link style={{ textDecoration: 'none' }} to="/"><i className="logo fas fa-futbol"></i></Link>
                            <ul className="main-nav">
                                <p>Welcome back <Link style={{ textDecoration: 'none' }} to={'profile/' + this.props.user.id}>{user.userName}</Link>!</p>
                                <Link style={{ textDecoration: 'none' }} to="/createprono"><li className="navlink">Create Prono</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/teamwizard"><li className="navlink">Add Teams</li></Link>
                                <Link style={{ textDecoration: 'none' }} to="/" onClick={(e) => this.props.handleLogout()}><li className="loginbutton" >Log Out</li></Link>
                            </ul>
                        </div>
                    </nav>
                </React.Fragment>
            )
        }
    }
}