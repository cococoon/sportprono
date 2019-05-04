import React from 'react';
import BASEURL from '../config/api';
import axios from 'axios';
export default class TeamList extends React.Component {

	componentDidMount() {
		axios.get(BASEURL + '/team')
			.then((response) => {
				let [...data] = response.data.data;
				this.setState({
					isLoaded: true,
					teams: data
				});
			});
	}

	render() {
		return (
			<div className="container">
				<p>Teamlist</p>
			</div>
		)
	}
}