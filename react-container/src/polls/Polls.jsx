import React from 'react';
import '../styles/fonts.css';
import '../styles/layout.css';
import '../styles/header.css';
import '../styles/sidebar.css';

import '../styles/views.css';
import '../styles/reply.css';

import { AuthDB } from '../hooks/AuthDB';

import { Header } from '../components/Header';
import { Profile } from '../components/Profile';
import { Greetings } from '../components/Greetings';
import { AsideButton } from '../components/AsideButton';

import { AddPoll } from './AddPoll';
import { ListPoll } from './ListPoll';

import { Reply } from '../reply/Reply';
import { ReplyList } from '../reply/ReplyList';
import { ReplyView } from '../reply/ReplyView';


class Polls extends React.Component {

    constructor(props) {
        super(props);

		AuthDB.Redirect();

		console.log(this.props)
		console.log(localStorage)

		this.state = {
			content: this.props.content,
			link: this.props.link
		}
    }

	GetView() {
		let content = this.state.content;
		switch(content) {
			case('Greetings'): return <Greetings />
			case('Profile'): return <Profile />
			case('AddPoll'): return <AddPoll />
			case('ListPoll'): return <ListPoll
				ShowReply={(link) => this.SetView('Reply', link)}
				ShowReplyList={(link) => this.SetView('ReplyList', link)}
			/>
			case('Reply'): return <Reply 
				link={this.state.link} 
				ShowReplyView={(link) => this.SetView('ReplyView', link)}
			/>
			case('ReplyList'): return <ReplyList 
				link={this.state.link}
				ShowReplyView={(link) => this.SetView('ReplyView', link)}
				ShowListPoll={() => this.SetView('ListPoll')}
			/>
			case('ReplyView'): return <ReplyView
				link={this.state.link}
				ShowReplyList={(link) => this.SetView('ReplyList', link)}/>
			default: return <div>this page is not exists</div> 
		}
	}
	SetView(viewName, link = null) {
		this.setState({ content: viewName, link: link });
	}

	render() {
		return <>
			<Header ShowGreetings={() => { this.SetView('Greetings') }} ShowProfile={() => { this.SetView('Profile') }}/>
			<aside>
				<AsideButton viewName='addPoll' viewImage='addPollAside' buttonSign='New Poll' Action={() => { this.SetView('AddPoll') }}/>
				<AsideButton viewName='listPoll' viewImage='listPollAside' buttonSign='My Polls' Action={() => { this.SetView('ListPoll') }}/>
			</aside>
			<main>
				<article id="views">{this.GetView()}</article>
			</main>
		</>
	}
}
export { Polls };
