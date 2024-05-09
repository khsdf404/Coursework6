import React from 'react';
import { ReplyDB } from '../hooks/ReplyDB';


class ReplyList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			replies: []
		}
		
		ReplyDB.GetReplyList(this.props.link).then(result => {
			this.setState({ replies: result })
		});
	}

	render() {
		let replies = [];
		if (this.state.replies)
			replies = this.state.replies;
		return <section id="replyPollVipollsew">
			{
				replies.map((row, i) => {
					return  <article className="question-form" key={++i}>
						<section style={{justifyContent: 'space-between'}}>
							<div style={{alignSelf: 'start'}}>{i + 1}. Ответ от {row.creationTime.replace(/T[\s\S]+/g, '')}</div>

							<button className='reply-btn-link' key={i++} onClick={() => {
								this.props.ShowReplyView(row['link']);
							}}>Открыть
							</button>
						</section>
					</article>
				}) || <></>
			}
			<button className="reply-btn" id="" onClick={() => {
				this.props.ShowListPoll();
			}}>Вернуться</button>
		</section>
	}
}
export { ReplyList };
