import React from 'react';
import { PollsDB } from '../hooks//PollsDB';
import { ReactComponent as DeleteIcon } from '../styles/icons/x.svg'
import '../styles/list-poll.css';


function unsecuredCopyToClipboard(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
	  document.execCommand('copy');
	} catch (err) {
	  console.error('Unable to copy to clipboard', err);
	}
	document.body.removeChild(textArea);
}

class ListPoll extends React.Component {

	constructor(props) {
		super(props);

		this.state = ({
			userPolls: []
		});

		PollsDB.GetUserPolls().then(result => { 
			this.setState({ userPolls: result })
		});
	}

	render() {
		return <section id="listPollView">
			{ 
			
				this.state.userPolls.map((row, i) => {
					return <div className="poll-elem" key={i++}>
						<h3>{row.name} 
							<DeleteIcon className="deleteIcon" onClick={() => {
								this.state.userPolls.splice(i-1, 1)
								PollsDB.DeletePoll(`${row.link}`);
								this.setState({ userPolls: this.state.userPolls });
							}} />
						</h3>
						<span>Количество ответов: {row.replyAmount}</span>
						<span>Дата создания: {row.creationTime.replace(/T[\s\S]+/g, '')}</span>
						<span>Дата окончания: {row.expirationTime.replace(/T[\s\S]+/g, '')}</span>

						<div>
							<button onClick={() => {
								unsecuredCopyToClipboard(`http://192.168.74.57:3000/reply/${row.link}`)
								alert('Ссылка скопирована');
							}}>Скопировать ссылку</button>
							<button onClick={() => {
								this.props.ShowReply(row.link);
							}}>Пройти опрос</button>
							<button onClick={() => {
								this.props.ShowReplyList(row.link);
							}}>Посмотреть ответы</button>
						</div>
					</div> 
				})	

			}
		</section>
	}
}
export { ListPoll };
