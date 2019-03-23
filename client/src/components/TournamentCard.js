import React from 'react';
import { NavLink } from 'react-router-dom';
const Link = NavLink;

export default class TournamentCard extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <div className="tournamentcard">
                <Link style={{ textDecoration: 'none', color: '#000', fontSize: '1.3rem' }} to={'tournament/' + this.props.id}>{this.props.tname}</Link>
                <p>{this.props.tuser}</p>
                <a className="subscribe" href="#">Enter</a>
            </div>
        )
    }
}