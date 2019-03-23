import React from 'react';
import axios from 'axios';
import TournamentCard from './TournamentCard';
import Loader from './Loader';
import BASEURL from '../config/api';
export default class TournamentList extends React.Component {
    constructor(props) {
        super();
        this.state = {}
    }
    componentDidMount() {
        axios.get(`${BASEURL}/tournament`)
            .then((response) => {
                let [...data] = response.data.data;
                this.setState({
                    isLoaded: true,
                    tournaments: data
                });
            });

    }

    render() {
        let tournaments = this.state.tournaments;
        let isLoaded = this.state.isLoaded;
        let content;
        if (!isLoaded) {
            content = <Loader />
        } else {
            content = tournaments.map((tournament, index) => {
                return (<TournamentCard className="tournamentcard" key={index} id={tournament._id} tname={tournament.tournamentName} />);
            })
        }

        return (
            <article className="tournamentlist">
                <h3>Current Pronos</h3>
                {content}
            </article>
        )
    }
}