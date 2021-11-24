import React from 'react';
import reactDom from 'react-dom';
import './button.css';

export default class Button extends React.Component{
    render(){
        return(
            <button className="button" {...this.props}>{this.props.title}</button>
        );
    }
}