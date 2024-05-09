import React from 'react';
import '../styles/fonts.css';
import '../styles/layout.css';
import './styles/auth-layout.css';
import { AuthDB } from '../hooks/AuthDB';
import { AuthField } from './AutField';
import { AuthButton } from './AuthButton';


class Authorize extends React.Component {

	constructor(props) {
		super(props);
		this.state = { showRegFields: false };

		AuthDB.Redirect();
	}

	
	render() { 
		return <main id="authMain">
	  		<article className="authorization-card">
				<section className="authorization-type">
					<div className={`${this.state.showRegFields ? '' : 'active'} non-select login`} data-text="CONTINUE" onClick={() => this.setState({showRegFields: false})}>Login</div>
					<div className={`${this.state.showRegFields ? 'active' : ''} non-select signup`} data-text="CREATE ACCOUNT" onClick={() => this.setState({showRegFields: true})}>Sign up</div>
				</section>
				<section className={`authorization-info sign-${this.state.showRegFields ? 'in' : 'up'}`}>
					<AuthField name="username" />
					<AuthField name="email" className={this.state.showRegFields ? '' : 'hidden'}/>
					<AuthField name="phone" className={this.state.showRegFields ? '' : 'hidden'}/>
					<AuthField name="password" />
				</section>
				<AuthButton showRegFields={this.state.showRegFields} />
			</article>
  		</main>
	}
}
export { Authorize };
