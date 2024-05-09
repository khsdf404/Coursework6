import React from 'react';
import { ReplyDB } from '../hooks/ReplyDB';


class ReplyView extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			reply: []
		}

		ReplyDB.GetReply(this.props.link).then(result => {
			this.setState({ reply: result })
		});
	}

	render() {
		let questions = [];
    	let answers = [];
		let rightAnswers = [];
		if (this.state.reply && this.state.reply.questions) {
			questions = this.state.reply.questions.split('|');
    		answers = this.state.reply.answers.split('|');
    		rightAnswers = (this.state.reply.rightAnswers && this.state.reply.rightAnswers.split('|')) || null;
		}
		return <section id="replyPollView">
			{
				questions.map((e, i) => {
					return <article className="question-form" key={++i}>
						<section>
							<div>Вопрос: {e}</div>
						</section>
		
						<section>
							<div>Ответ: {answers[i]}</div>
						</section>

						{ 
							this.state.reply.rightAnswers ? 
								<section>
									<div>Правильный ответ: {rightAnswers[i]}</div>
								</section> 
								: <></>
						}
						
					</article>
				}) || <></>
			}

			<button className="reply-btn" id="" onClick={() => {
				this.props.ShowReplyList(this.state.reply.pollLink)
			}}>Вернуться</button>
		</section>
	}
}
export { ReplyView };
