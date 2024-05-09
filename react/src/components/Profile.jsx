import React from 'react';
import { AuthDB } from '../hooks/AuthDB'
import { AuthField } from '../authorize/AutField';
import '../styles/profile.css';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                login: '',
                email: '',
                phone: '',
                password: ''
            }
        }

        AuthDB.GetUserInfo('').then((result) => {
            this.setState({ userInfo: result })
        })
    }

	render() {

        const { login, email, phone, password }  = this.state.userInfo;

		return <section id="profileView" className="">
            <article className="authorization-card">
                <section className="authorization-type">
                    <div className="non-select login active"> { login } </div>
                </section>
                <section className="authorization-info">
                    <AuthField value={email} name="email"/>
                    <AuthField value={phone} name="phone"/>
                    <AuthField value={password} name="password"/>
                </section>
                <section className="authorization-confirm">
                    <button id="profileConfirm" onClick={async () => {
                        let userObj = {
                            email: document.getElementById("email").value,
                            phone: document.getElementById("phone").value,
                            password: document.getElementById("password").value
                        }

                        await AuthDB.UpdateUserInfo(userObj);
                        
                        console.log(userObj);
                    }}>Save</button>
                </section>
            </article>
        </section>
	}
}
export { Profile };
