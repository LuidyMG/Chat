import React from 'react';
import './alert.css';

export default class Alert extends React.Component{

    state = {
        animationRun: false
    }

    componentDidMount(){
        setTimeout(function(){this.setState({animationRun: true})}.bind(this), 5);
        setTimeout(function(){this.setState({animationRun: false})}.bind(this), 5000);
    }

    render(){
        var cssStyle = (this.props.type).toString() +' '+(this.props.position).toString() + ' alert ';
        cssStyle += this.state.animationRun ? (this.props.position).toString()+'-run' : '';
        if((this.props.position).toString().split('-')[0] === 'bottom'){
            var style = {bottom: (this.props.number*10)+'vh'};
        }
        return(
            <div className={cssStyle} style={style}>
                <p>{this.props.text}</p>
            </div>
        );
    }
}