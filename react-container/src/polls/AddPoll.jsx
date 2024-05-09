import React from 'react';
import { PollsDB } from '../hooks/PollsDB';
import '../styles/add-poll.css';


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

class AddPoll extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			bebra: []
		}
	}

	render() {

		return <section id="addPollView">
			<input className="poll-name-input" placeholder="Название опроса" />
            <input className="poll-date-input"  placeholder="Дата окончания" />
            <div className="addPoll-buttons">
                <button id="addQuestionBtn" onClick={() => {
					this.state.bebra.push(1);
					this.setState({ bebra: this.state.bebra });
				}}>Добавить вопрос</button>
                <button id="postPollBtn" onClick={() => {
					let questionsStr = '';
					let answersStr = '';

					let questionForms = document.getElementsByClassName('question-form');
					
					for (let i = 0; i < questionForms.length; i++) {
						let inputs = questionForms[i].getElementsByTagName('input');
						questionsStr += inputs[0].value + '|'
						answersStr += inputs[1].value + '|'
					}
					questionsStr = questionsStr.replace(/(\|)$/g, '');
					answersStr = answersStr.replace(/(\|)$/g, '');

					let pollObj = {
						name: document.getElementsByClassName(`poll-name-input`)[0].value,
						expirationTime: document.getElementsByClassName(`poll-date-input`)[0].value,
						answers: answersStr,
						questions: questionsStr
					};
			
					PollsDB.PostPoll(pollObj).then((result) => {
						this.setState({bebra: []})
			
						unsecuredCopyToClipboard(`http://192.168.74.57:3000/reply/${result.link}`)
						alert('Ссылка на опрос скопирована!');
					});
				}}>Опубликовать</button>
            </div>

			{ this.state.bebra.map((e, i) => 
				<article key={++i} className="question-form">
					<section>
						<div>Вопрос: </div>
						<input />
					</section>

					<section>
						<div>Правильный ответ: </div>
						<input />
					</section>
            	</article>
			) }
		</section>
	}
}
export { AddPoll };
