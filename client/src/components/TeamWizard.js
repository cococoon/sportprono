import React from 'react';
import Team from './Team';
import axios from 'axios';
import Section from './Section';
import BASEURL from '../config/api';
export default class TeamWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        //this.handleReset = this.handleReset.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSave() {
        this.state.teams.map((team) => {
            axios({
                url: `${BASEURL}/${this.props.tournamentId}/teams/${team.teamId}`,
                method: 'post',
                data: {
                    teamId: team.teamId,
                    tournamentId: this.props.tournamentId
                },
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
                responseType: 'json'
            }).then(
                (res) => {
                    // console.log(res.data);
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
                teamName: name
            },
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            responseType: 'json'
        }).then(
            (res) => {
                teams = [...this.state.teams, res.data.data];
                console.log(teams);
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
    handleDelete(index) {
        let teams = this.state.teams.filter((team, i) => {
            if (index !== i) {
                return team;
            }
        })
        this.setState({
            teams: teams
        })
    }

    render() {
        return (
            <Section>
                <div className="container">
                    <h3>Teamlist</h3>
                    <div className="buttons">
                        <a onClick={(e) => this.handleSave(this.state.teams)} className="btn btn-green">Save</a>
                        <a onClick={(e) => this.handleReset()} className="btn btn-warning">Reset</a>
                    </div>
                    {
                        this.state.teams.map((team, index) => {
                            return (
                                <Team key={index} index={index} name={team.teamName} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                            );
                        })
                    }
                </div>
                <form className="form" onSubmit={(e) => this.handleSubmit(e, this.refs.team.value)} >
                    <h2>Add teams</h2>
                    <label>Team name</label>
                    <input ref="team" placeholder="Belgium" />
                    <input type="submit" value="Add Team" />
                </form>
            </Section>
        )
    }
}
