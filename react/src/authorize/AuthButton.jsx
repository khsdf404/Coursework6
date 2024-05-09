import React from 'react';
import './styles/auth-button.css';
import { AuthDB } from '../hooks/AuthDB';
import { LocalStorage } from '../hooks/LocalStorage';
import { Link } from 'react-router-dom';

class AuthButton extends React.Component {

	render() {
		return <section className='authorization-confirm'>
            <Link to='/polls/' onClick={async (e) => {
                e.preventDefault();

                let user = {
                    login: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value
                }
        
                let responseData;
        
                if (this.props.showRegFields)
                    responseData = await AuthDB.Registry(user);
                else
                    responseData = await AuthDB.Login(user);
                
        
                if (responseData !== null) {
                    LocalStorage.SetToken(responseData['token']);
                    
                    if (responseData['role'] === 'ROLE_USER')
                        window.location.replace('/polls/')
                }
            }}>{this.props.showRegFields ? 'CREATE ACCOUNT' : 'CONTINUE'}</Link>
        </section>
	}
}
export { AuthButton };
