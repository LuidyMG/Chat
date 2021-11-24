import React from 'react';
import './inputChat.css';
import SendIcon from '../assets/sendIcon.png';

export default class InputChat extends React.Component{
    render(){
        return(
            <input type="text" className="inputChat" {...this.props} />
        );
    }
}