import React from 'react';
import axios from 'axios';

import BASEURL from '../config/api';
import Loader from './Loader';
import UserCard from './UserCard';

export default class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        axios.get(`${BASEURL}/user`)
            .then((response) => {
                let [...data] = response.data.data;
                this.setState({
                    isLoaded: true,
                    users: data
                });
            });
    }
    render() {
        let users = this.state.users;
        let isLoaded = this.state.isLoaded;
        let content;
        if (!isLoaded) {
            content = <Loader />
        } else {
            content = users.map((user, index) => {
                return (<UserCard key={index} user={user} />);
            })
        }
        return (
            <article className="userlist">
                <h3>Users</h3>
                {content}
            </article>
        );
    }
}