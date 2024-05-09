import React from 'react';


class AsideButton extends React.Component {

    render() {
        return <article data-name={this.props.viewName} onClick={() => {
            this.props.Action();
        }}>
            <span className={`sidebar-icon ${this.props.viewImage}`}></span>
            <span className={`sidebar-label non-select`}>{this.props.buttonSign}</span>
        </article>
    }

}

export { AsideButton } 

