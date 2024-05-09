import React from 'react';
import { ReplyDB } from '../hooks/ReplyDB';


class Reply extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			poll: []
		}

		ReplyDB.GetPoll(this.props.link).then(result => {
			this.setState({ poll: result })
		});
	}

	render() {
		let questions = '';
		if (this.state.poll && this.state.poll.questions)
			questions = this.state.poll.questions;
		return <section id="replyPollView">
			{
				questions.split('|').map((question, i) => {
					return <article className="question-form" key={++i}>
						<section>
							<div>{question}</div>
						</section>
		
						<section>
							<div>Ответ: </div>
							<input />
						</section>
					</article>
				}) || <></>
			}
			<button className="reply-btn" id="postReplyBtn" onClick={() => {
				let answers = '';

				let $answers = document.getElementsByTagName('input');
				for (let i = 0; i < $answers.length; i++)
					answers += $answers[i].value + '|';

				answers = answers.replace(/(\|)$/g, '');
		
				let replyObj = {
					pollLink: this.props.link,
					answers: answers
				};
		
				ReplyDB.PostReply(replyObj).then(result => {
					this.props.ShowReplyView(result['link']);
				});
			}}>Завершить</button>
		</section>
	}
}
export { Reply };
