import React from 'react'
import axios from 'axios'
class TournamentStage extends React.Component {
    constructor(props) {
        super(props)
        this.styles = {
            team: {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyItems: "space-between"
            },
            input: {
                maxWidth: '30px',
                fontSize: '.7rem'
            },
            teamName: {
                fontSize: '.8rem',
                paddingRight: '10px'
            }
        }
    }


    componentDidUpdate() {
        this.calculateKnockoutRounds(this.state.teams);
        this.calculateKnockoutMatches(this.state.teams);


    }



    createEliminationBrackets(teamsArray){

    }

    calculateKnockoutRounds(teamsArray) {
        const size = teamsArray.length;
        const numberOfKnockoutRounds = Math.ceil(Math.log(size) / Math.log(2));
        return numberOfKnockoutRounds;
    }

    calculateByes(teamsArray) {
        const size = teamsArray.length;
        const numberOfByes = Math.pow(2, Math.ceil(Math.log2(size))) - size;
        return numberOfByes;
    }


    componentDidMount() {
        axios.post()
        this.setState({
            isLoaded: true
        })
    }


    render() {
        return (
            <div className="tournamentStage" >
                <div className="tournamentStage__row">
                    <div className="tournamentStage__row-title">
                        <h3>Round 1</h3>
                    </div>
                    <div className="tournamentStage__row-content">
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                    </div>
                </div>
                <div className="tournamentStage__row">
                    <div className="tournamentStage__row-title">
                        <h3>Round 2</h3>
                    </div>
                    <div className="tournamentStage__row-content">
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                    </div>
                </div>
                <div className="tournamentStage__row">
                    <div className="tournamentStage__row-title">
                        <h3>Final</h3>
                    </div>
                    <div className="tournamentStage__row-content">
                        <div className="tournamentStage__match">
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 1</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                            <div style={this.styles.team}><p style={this.styles.teamName}>Team 2</p><input style={this.styles.input} type="number" placeholder="-" min="0" /></div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default TournamentStage
