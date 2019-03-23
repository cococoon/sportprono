import React from 'react';

export default class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        }
    }
    handleChange(name) {
        this.setState({
            name: name
        })
    }
    render() {
        return (
            <div className="team wow fadeInDown">
                <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e.target.value)} />
                <div className="buttons">
                    <a href="#" className="btn btn-orange" onClick={(e) => this.props.handleEdit(this.props.index, this.state.name)}>edit</a>
                    <a href="#" className="btn btn-warning" onClick={(e) => this.props.handleDelete(this.props.index)}>delete</a>
                </div>
            </div>
        )
    }
}