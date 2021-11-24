import React from 'react';
import './itemBar.css';

import chatIcon from '../assets/chatIcon.png';
import addFriend from '../assets/addFriend.png';
import getOut from '../assets/getOut.png';

export default class ItemBar extends React.Component{
    render(){
        var classActive = this.props.active === 'true' ? 'active' : '';
        var icon = this.props.nameIcon === 'chat' ? chatIcon : this.props.nameIcon === 'addFriend' ? addFriend : getOut;
        return(
            <div className={"item "+classActive} {...this.props}>
                <img src={icon} />
            </div>
        );
    }
}