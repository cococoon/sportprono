import React from 'react';
import Main from './Main';
import Section from './Section';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {

    render() {
        let user = this.props.user;
        if (!user) {
            return (
                <Main>
                    <Section>
                        <div className="form">
                            <h2>LOGIN</h2>
                            <input type="text" placeholder="Username" ref="username"></input>
                            <input type="password" placeholder="Password" ref="password"></input>
                            <input value="Log In" type="button" onClick={(e) => this.props.handleLogin(this.refs.username.value, this.refs.password.value)} />
                        </div>
                    </Section>
                </Main>
            );
        } else if (user.auth) {
            return (<Redirect to="/" />);
        } else {
            return (<h2>login failed</h2>);
        }
    }
}