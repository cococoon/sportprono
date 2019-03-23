import React from 'react';
import Section from './Section';
import TournamentList from './TournamentList';
import TeamList from './TeamList';
import Main from './Main';
import UserList from './UserList';
import Hero from './Hero';
import TextContainer from './TextContainer';

export default class Home extends React.Component
{
	render(){
		return(
			<div>
			<Hero user={this.props.user}/>
				<Main>
					<Section>
					<TextContainer 
						title='Create or Play!' 
						text='Create your own Prono and invite friends! 
						Or subscribe to a public prono and start playing now.' 
					/>
					<TournamentList tournaments={this.props.tournaments} />
					</Section>
					<Section>
					<UserList users={this.props.users} />
					<TeamList teams={this.props.teams} />
					<TextContainer title='No More Payment Worries!' text='Only those who have payed up front are subscribed to your prono. No more texting your friends and asking for money. The winner(s) automagically get their share of the pot.' />
					</Section>
				</Main>
			</div>);
	}
}