import React from 'react';
import BASEURL from '../config/api';
import axios from 'axios';
import Main from './Main';
import Section from './Section';
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (!this.state.user) {
            let userId = this.props.match.params.id;
            axios.get(`${BASEURL}/user/${userId}`)
                .then((response) => {
                    let { user } = response.data;
                    this.setState({ user: user })
                })
        }
    }

    render() {

        if (!this.state.user) {
            return (
                <React.Fragment><p>Loading...</p><p style={{ textAlign: 'center' }}><i className="spin fas fa-spinner"></i></p></React.Fragment>
            );
        } else {
            let user = this.state.user;
            let facebook = user.facebook ? <a href={user.facebook} target="_blank"><i class="fab fa-facebook"></i></a> : null;
            let twitter = user.twitter ? <a href={user.twitter} target="_blank"><i class="fab fa-twitter"></i></a> : null;
            let linkedin = user.linkedin ? <a href={user.linkedin} target="_blank"><i class="fab fa-linkedin"></i></a> : null;
            return (
                <Main>
                    <Section>
                        <article className="profile-wrapper">
                            <div className="profile-card">
                                <img className="profile-image" src="https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ" />
                                <h2 style={{ textAlign: 'center' }}>{user.userName}</h2>
                                <h3>First Name</h3>
                                <p>{user.firstName ? user.firstName : 'no firstname'}</p>
                                <h3>Last Name</h3>
                                <p>{user.lastName ? user.lastName : 'no lastname'}</p>
                                <h3>Contact</h3>
                                <p className="profile-social">
                                    <a href={'mailto:' + user.email}><i class="fas fa-envelope"></i></a>
                                    {facebook}
                                    {twitter}
                                    {linkedin}
                                </p>
                                <h3>About</h3>
                                <p>{user.description ? user.description : 'no description given'}</p>
                            </div>
                            <div className="profile-prono-card">
                                <h3>Current Pronos:</h3>
                                <p>{user.tournaments ? user.tournaments : 'nothing going on'}</p>
                                <h3>{user.userName}'s pronos</h3>
                                <p>{user.pronos ? user.pronos : 'no pronos hosted'}</p>
                                <h3>Pronos won</h3>
                                <p>{user.pronosWon ? user.pronosWon : 0}</p>
                                <h3>Pronos organized</h3>
                                <p>{user.pronosOrganized ? user.pronosOrganized : 0}</p>
                            </div>
                        </article>
                    </Section>
                </Main>
            );
        }
    }


}