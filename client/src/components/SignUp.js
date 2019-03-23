import React from 'react';
import Main from './Main';
import Section from './Section';
export default class SignUp extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Main>
                <Section>
                    <div className="form">
                        <h2>SIGN UP</h2>
                        <input required type="text" placeholder="Username" ref="username"></input>
                        <input required type="email" placeholder="Email" ref="email"></input>
                        <input required type="password" placeholder="Password" ref="password"></input>
                        <input value="Sign Up" type="button" onClick={(e) => this.props.handleSignup(this.refs.username.value, this.refs.password.value, this.refs.email.value)} />
                    </div>
                </Section>
            </Main>
        );
    }
}