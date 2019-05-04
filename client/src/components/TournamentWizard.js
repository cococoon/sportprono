import React from 'react';
import Main from './Main';
import TeamWizard from './TeamWizard';
import { Redirect } from 'react-router-dom';
import Section from './Section';

import BASEURL from '../config/api';
import axios from 'axios';
export default class TournamentWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupsAmount: 0,
            teamsPerGroup: 0,
            teamsAmount: 0,
            format: 'elimination',
            name: '',
            startdate: '',
            enddate: ''
        }

        this.handleTournamentNameChange = this.handleTournamentNameChange.bind(this);
        this.handleCreateTournament = this.handleCreateTournament.bind(this);
    }


    handleTournamentNameChange(name) {
        this.setState({ name: name });
    }

    handleStartDateChange(date) {
        this.setState({
            startdate: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            enddate: date
        })
    }

    handleRegisterStartDateChange(date) {
        this.setState({
            registerstartdate: date
        });
    }

    handleRegisterEndDateChange(date) {
        this.setState({
            registerenddate: date
        })
    }

    handleFormatChange(e, format) {
        e.preventDefault();
        this.setState({ format: format });
    }

    handleTeamsPerGroupChange(e) {
        e = Number(e.target.value);
        this.setState({ teamsPerGroup: e });
    }

    handleTeamsAmountChange(value) {
        Number(value);
        this.setState({ teamsAmount: value });
    }

    handleGroupsAmountChange(e, value) {
        Number(value);
        this.setState({ groupsAmount: value });
    }

    handleCreateTournament() {
        axios({
            url: `${BASEURL}/tournament/create`,
            method: 'post',
            data: {
                tournamentname: this.state.name,
                startdate: this.state.startdate,
                enddate: this.state.enddate
            },
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
            responseType: 'json'
        }).then(
            (res) => {
                this.setState({
                    tournament: res.data,
                    created: true
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const format = this.state.format;
        if (!this.state.created) {
            return (
                <Main>
                    <Section>
                        <form className="form">
                            <h2>Create a Prono</h2>
                            <label>Prono name</label>
                            <input ref="tname" onChange={(e) => this.handleTournamentNameChange(e.target.value)} placeholder="World Cup" />
                            <label>Tournament start date</label>
                            <input type="date" onChange={(e) => this.handleStartDateChange(e.target.value)} />
                            <label>Tournament end date</label>
                            <input type="date" onChange={(e) => this.handleEndDateChange(e.target.value)} />
                            <label>Register start date</label>
                            <input type="date" onChange={(e) => this.handleRegisterStartDateChange(e.target.value)} />
                            <label>Register end date</label>
                            <input type="date" onChange={(e) => this.handleRegisterEndDateChange(e.target.value)} />
                            <label>Tournament Format</label>
                            <select id="format" ref="format" onChange={(e) => this.handleFormatChange(e, this.refs.format.value)}>
                                <option value="elimination">Single Elimination</option>
                                <option value="twolegged">Two-legged tie</option>
                                <option value="roundrobin">Round Robin</option>
                            </select>
                            {
                                (format === "roundrobin") ?
                                    <React.Fragment>
                                        <label>Number of Groups</label>
                                        <input onChange={(e) => this.handleGroupsAmountChange(e.target.value)} ref="groupNumber" type="number" placeholder="0" required />
                                        <label>Teams per Group</label>
                                        <input onChange={(e) => this.handleTeamsPerGroupChange(e.target.value)} ref="groupTeams" type="number" placeholder="0" required />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <label>Number of teams</label>
                                        <input onChange={(e) => this.handleTeamsAmountChange(e.target.value)} ref="teamNumber" type="number" placeholder="0" required />
                                    </React.Fragment>
                            }
                            <input type="button" value="Create Prono" onClick={(e) => this.handleCreateTournament(this.state.groupsAmount, this.state.teamsPerGroup, this.state.teamsAmount)} />
                        </form>
                    </Section>
                </Main>
            );
        } else {
            return (
                <Redirect to={'/teamwizard/' + this.state.tournament.data._id} />
            )
        }
    }
}