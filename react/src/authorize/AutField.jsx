import React from 'react';
import './styles/auth-fields.css';

class AuthField extends React.Component {
	
	render() { 
        const { name, className, value } = this.props;
		return <div className={`field-container ${className || ''}`}>
            <input defaultValue={value ? value : ''} id={name} type="text" placeholder={this.props.name} autoComplete="new-password"/>
            <span>{name}</span>
        </div>
	}
}
export { AuthField };
