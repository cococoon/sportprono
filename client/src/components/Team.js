import React from 'react';

export default class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            seed: this.props.index + 1
        }
    }

    handleChange(name) {
        this.setState({
            name: name
        })
    }


    componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
            this.setState({ name: this.props.name });
        }
    }

    render() {
        return (
            <div className="team wow fadeIn">
                <input type="checkbox"></input>
                <p>{this.state.seed}</p>
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e.target.value)} />
                <div className="buttons">
                    <a className="btn btn-warning" onClick={(e) => this.props.handleDelete(this.props.index, this.props.id)}>delete</a>
                </div>
            </div>
        )
    }
}