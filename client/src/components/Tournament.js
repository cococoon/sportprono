import React from 'react';
import axios from 'axios';
import Main from './Main';
import MatchList from './MatchList';
import TeamList from './TeamList';
import Loader from './Loader.js';
import BASEURL from '../config/api';

export default class Tournament extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        if (!this.state.isLoaded) {
            let tournamentId = this.props.match.params.id;
            axios.get(BASEURL + '/tournament/' + tournamentId)
                .then((response) => {
                    let tournament = response.data.tournament;
                    this.setState({
                        isLoaded: true,
                        tournament: tournament
                    });
                });
        }
    }

    render() {
        console.log(this.state.tournament);
        // let startdate = new Date(this.state.tournament.startDate);
        // let enddate = new Date(this.state.tournament.endDate);
        if (!this.state.isLoaded) {
            return (
                <Main>
                    <Loader />
                </Main>
            );
        } else {
            return (
                <Main>
                    <article className="tournament">
                        <h1>{this.state.tournament.tournamentName}</h1>
                        {/* <h2>Startdate: {startdate} End date: {enddate}</h2> */}
                        <TeamList teams={this.state.tournament.teams} />
                        <MatchList matches={this.state.tournament.matches} />
                    </article>
                </Main>
            )
        }
    }
}