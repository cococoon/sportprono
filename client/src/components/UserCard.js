import React from 'react';
import { NavLink } from 'react-router-dom';

const Link = NavLink;
export default class UserCard extends React.Component {
    render() {
        let user = this.props.user;
        let className = 'fas fa-baseball-ball';
        className += (user.status) ? ' online' : ' offline';
        return (
            <div className="usercard">
                <i className={className} />
                <Link style={{ textDecoration: 'none' }} to={'profile/' + user._id}>{user.userName}</Link>

            </div>
        )
    }
}