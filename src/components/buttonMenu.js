import React from 'react';
import './buttonMenu.css';

export default class ButtonMenu extends React.Component{
    render(){
        return(
            <div className="icon" {...this.props}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}