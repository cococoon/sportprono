import React from 'react';
import BASEURL from '../config/api';
import axios from 'axios';
export default class TeamList extends React.Component {

	componentDidMount() {
		axios.get(BASEURL + '/teams')
			.then((response) => {
				let [...data] = response.data.data;
				this.setState({
					isLoaded: true,
					tournaments: data
				});
			});
	}

	render() {
		return (
			<p>Teamlist</p>
		)
	}
}