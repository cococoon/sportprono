import React from 'react';
import Team from './Team';
import Main from './Main';
import axios from 'axios';
import TournamentStage from './TournamentStage'
import Loader from './Loader'
import BASEURL from '../config/api';
export default class TournamentAdmin extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.tournamentId)
        this.state = {
            tournamentId: "",
            teams: [],
            isLoaded: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        //this.handleReset = this.handleReset.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    calculateEliminationMatches(teamsArray) {
        let teams = [...teamsArray];
        const wantedTeams = Math.pow(2, Math.ceil(Math.log2(teams.length)));
        const numberOfByes = wantedTeams - teams.length;
        const firstRoundMatches = wantedTeams / 2;
        let firstRoundMatchesArray = [];
        const numberOfRounds = Math.ceil(Math.log2(teams.length));
        //ADD BYE TEAMS TO TEAMSARRAY
        for (let i = 0; i < numberOfByes; i++) {
            teams.push({ teamName: 'BYE' });
        }

        //FILL HOMEPLAYERS IN MATCHARRAY FIRST CHRONOLOGICAL
        for (let j = 0; j < firstRoundMatches; j++) {
            const match = [teams.shift()];
            firstRoundMatchesArray.push(match);
        }
        //FILL AWAY PLAYERS IN MATCHARRAY
        for (let k = 0; k < firstRoundMatches; k++) {
            firstRoundMatchesArray[k].push(teams.shift());
        }

        /*
                //FILL EVEN GAMES WITH AWAYPLAYERS IN MATCHARRAY
                for (let l = 0; l <= firstRoundMatches; l + 2) {
                    firstRoundMatchesArray[l].push(teams.shift());
                }
        
                //FILL UNEVEN GAMES WITH AWAYPLAYERS IN MATCHARRAY
                for (let k = 1; k <= firstRoundMatches; k + 2) {
                    firstRoundMatchesArray[k].push(teams.shift());
                }
        */

        this.setState({
            wantedTeams: wantedTeams,
            numberOfByes: numberOfByes,
            firstRoundMatches: firstRoundMatches,
            numberOfRounds: numberOfRounds
        })
    }

    //seed the first round matches

    //create all matches in the database
    //update a match in the next round if a winner is confirmed in the previous round


    handleSave(e) {
        e.preventDefault();
        this.state.teams.map((team) => {
            axios({
                url: `${BASEURL}/tournament/${this.state.tournament}/team/${team._id}`,
                method: 'post',
                data: {
                    teamId: team.teamId,
                    tournamentId: this.props.match.params.tournamentId
                },
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
                responseType: 'json'
            }).then(
                (res) => {

                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )
        });
    }
    handleSubmit(e, name) {
        e.preventDefault();
        let teams = [];
        axios({
            url: `${BASEURL}/team/create`,
            method: 'post',
            data: {
                teamName: name,
                tournamentId: this.props.match.params.tournamentId
            },
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            responseType: 'json'
        }).then(
            (res) => {
                teams = [...this.state.teams, res.data.data];
                this.setState({
                    teams: teams
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
        e.target.reset()
    }
    handleEdit(index, name) {
        let teams = this.state.teams.map((team, i) => {
            if (index === i) {
                team.name = name;
                return team;
            }
            return team;
        })

        this.setState({
            teams: teams
        })
    }

    /**
     * 
     * @param {event to prevent default} e 
     * @param {the index of the team} index 
     */
    handleDelete(index, teamId) {
        axios({
            url: `${BASEURL}/team/delete`,
            method: 'post',
            data: {
                teamId: teamId
            },
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            responseType: 'json'
        }).then(
            (res) => {
                let teams = this.state.teams.filter((team, i) => {
                    if (index !== i) {
                        return team;
                    }
                })
                this.setState({
                    teams: teams
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    /**
     * get all teams from a tournament
     */
    componentDidMount() {
        axios({
            url: `${BASEURL}/team/tournament/${this.props.match.params.tournamentId}`,
            method: 'get',
            // CORS ISSUE (lazy solution) params: {
            // tournamentId: this.props.match.params.tournamentId
            // },
            responseType: 'json'
        }).then(
            (res) => {
                console.log(res);
                this.setState({
                    teams: res.data.data,
                    isLoaded: true
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }


    render() {
        if (!this.state.isLoaded) {
            return (
                <Loader />
            )
        }
        return (
            <Main>
                <div className="tournamentDashboard">
                    <div className="teamList">
                        <h3>Teamlist</h3>
                        <div className="buttons">
                            <a onClick={(e) => this.handleSave(e)} className="btn btn-green">Ready</a>
                            <a onClick={(e) => this.handleRandomSeed(e)} className="btn btn-orange">Random seed</a>
                            <a onClick={(e) => this.handleReset()} className="btn btn-warning">Reset</a>
                        </div>
                        {
                            this.state.teams.map((team, index) => {
                                return (
                                    <Team key={index} index={index} id={team._id} name={team.teamName} handleSeed={this.handleSeed} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                                );
                            })
                        }
                        <form className="" onSubmit={(e) => this.handleSubmit(e, this.refs.team.value)} >
                            <input ref="team" placeholder="Belgium" />
                            <input type="submit" value="Add Team" />
                        </form>
                    </div>
                    <TournamentStage teams={this.state.teams} />
                </div>
            </Main>
        )
    }
}
