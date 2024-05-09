import React from 'react';
import { LocalStorage } from '../hooks/LocalStorage';
import { ReactComponent as  ProfileIcon } from '../styles/icons/user.svg'
import { ReactComponent as  LogoutIcon } from '../styles/icons/logout.svg'


class Header extends React.Component {

    render() {
        return <header>
            <h1 className="header-logo non-select" data-name="start"> 
                <a href="/polls/">KEVIN</a>
                <span style={{marginLeft: '0px'}}>.forms</span>
            </h1>
            <section>
                <ProfileIcon id="profileBtn" className="profile-btn" data-name="profile" onClick={() => {
                    this.props.ShowProfile();
                }} />
                <LogoutIcon id="logoutBtn" className="logout-btn" data-name="logout" onClick={() => {
                    LocalStorage.SetToken('')
                    window.location.href = '/';
                }} />
            </section>
        </header>
    }

}

export { Header } 

