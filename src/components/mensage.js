import React from 'react';
import './mensage.css';

export default class Mensage extends React.Component{
    render(){
        return (
            <div className={'mensage '+(this.props.your ? 'myMensage' : 'otherMensage')}>
                <div className="content">
                    <span className="text">{this.props.mensage}</span>
                    <span className="hour">{this.props.hour}</span>
                </div>
            </div>
        );
    }
}