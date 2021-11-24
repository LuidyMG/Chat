import React from 'react';
import './contact.css';
import Avatar from './Avatar';
import MoreItems from '../assets/moreItems.png';
import AddIcon from '../assets/iconAdd2.png';
import CloseIcon from '../assets/close.png';
import AcceptIcon from '../assets/accept.png';
import InvitedIcon from '../assets/invitedIcon.png';

import axios from 'axios';

export default class Contact extends React.Component{
    state = {
        invited: this.props.invited
    }

    addContact = (idContact,accept) => {

        var friendOfUser = {
            token: this.props.tokenUser,
            IdContactTwo: idContact,
            accept
        }
        if(!this.props.active){
            axios.post('http://localhost:4000/user/friend/', friendOfUser).then(res => {
                if(res.status === 201){
                    this.setState({invited: !this.state.invited});
                    this.props.inviteContact(); 
                }
            });
        }else{
            axios.delete(`http://localhost:4000/user/friend/remove/${this.props.tokenUser}[$_$]${idContact}`).then(res => {
                if(res.status === 201){
                    this.props.inviteContact();
                }
            });
        }
    }

    render(){
        var classSelect = this.props.contactSelect ? 'select' : '';
        return(
            <div className={'itemList '+classSelect}>
                <span>
                    <Avatar width="50px" height="50px" viewIconEdit="hidde" iverted={this.props.contactSelect === 'select'} />
                    <p>{this.props.nameContact}</p>
                </span>
                <span>
                    {this.props.active && <img src={CloseIcon} className="iconMoreItems" onClick={() => this.addContact(this.props.idContact,false)} />}
                    {this.props.add && <img src={AddIcon} className="iconMoreItems" onClick={() => this.addContact(this.props.idContact,false)} />}
                    {this.props.invited && !this.props.active && <img src={InvitedIcon} className="iconMoreItems" />}
                    {!this.props.invited && !this.props.active && !this.props.add && <span className="iconMoreItemsBox"><img src={AcceptIcon} className="iconMoreItems" onClick={() => this.addContact(this.props.idContact,true)} /><img src={CloseIcon} className="iconMoreItems" onClick={() => this.addContact(this.props.idContact,false)} /></span>}
                </span>
            </div>
        );
    }
}