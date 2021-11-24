import React from 'react';
import InputChat from './inputChat';
import './chat.css';
import Avatar from './Avatar';
import SendIcon from '../assets/sendIcon.png';
import Mensage from './mensage';
import axios from 'axios';
import socketIOClient from "socket.io-client";

var socket;
export default class Chat extends React.Component{
    state = {
        inputValue: '',
        chat: [],
        idFriend: ''
    }

    constructor(props) {
        super(props);
      }
      
    lookeMensage = () => {
        document.getElementsByClassName('body')[0].scrollTop = document.getElementsByClassName('body')[0].scrollHeight;
    }

    componentDidUpdate() {
        if(this.props.idFriend !== this.state.idFriend){
            this.setState({idFriend: this.props.idFriend, chat: []});
            axios.get(`http://localhost:4000/chat/${this.props.tokenUser}[$_$]${this.props.idFriend}`).then((res) => {
                if(res.data !== false){
                    this.mountChat(res.data);
                }
            });
        }
        this.lookeMensage();
    }

    componentDidMount(){
        this.setState({idFriend: this.props.idFriend});
        axios.get(`http://localhost:4000/chat/${this.props.tokenUser}[$_$]${this.props.idFriend}`).then((res) => {
            if(res.data !== false){
                this.mountChat(res.data);
            }
        });
        socket = socketIOClient('http://localhost:4000');
        socket.on('eventRequestMensage', (data) => {
            var showMensage = (data.Send === this.state.idFriend || data.SendToken === this.props.tokenUser) && (data.To === this.state.idFriend || data.ToToken === this.props.tokenUser);
            if(showMensage){
                this.showMensageLive(data);
            }
        });
        var inputEle = document.getElementById('inputMensage');
        inputEle.addEventListener('keyup', function(e){
            var key = e.which || e.keyCode;
            if (key == 13) {
                this.sendMensage();
            }
        }.bind(this));
    }

    showMensageLive = (data) => {
        var chat = this.state.chat;
        var mensage = {
            userSend: data.SendToken,
            mensage: data.Mensage,
            hour: data.Hour
        }
        chat.push(mensage);
        this.setState({chat});
    }

    mountChat = (chatBlock) => {
        var chat = this.state.chat;
        for(var i = 0 ;i<chatBlock.length; i++){
            var mensage = {
                userSend: chatBlock[i].SendToken,
                mensage: chatBlock[i].Mensage,
                hour: chatBlock[i].Hour
            }
            if(chatBlock[i].Send == this.state.idFriend || chatBlock[i].To == this.state.idFriend)
                chat.push(mensage);
        }
        this.setState({chat});
    }

    sendMensage = () => {
        if(this.state.inputValue.replace(/ /g,'') != ''){
            var hour = (new Date()).getHours()+':'+(new Date()).getMinutes()+((new Date()).getHours() >= 12 ? 'PM' : 'AM');
            var mensage = {
                token: this.props.tokenUser,
                idFriend: this.props.idFriend,
                mensage: this.state.inputValue,
                hour: hour
            }
            this.setState({inputValue: ''});
            axios.post('http://localhost:4000/chat/', mensage).then(res => {
                console.log(res);
            });
        }
    }
    
    render(){
        return(
            <div className="chat">
                <div className="header">
                    <Avatar width="60px" height="60px" viewIconEdit="hidde" inverted={true} />
                    <span>{this.props.nameContactUser}</span>
                </div>
                <div className="body" ref={this.myRef}>
                    {this.state.chat.map((mensage,i) => 
                        <Mensage your={mensage.userSend === this.props.tokenUser} key={i} mensage={mensage.mensage} hour={mensage.hour} />
                    )}
                </div>
                <div className="footer">
                    <InputChat id="inputMensage" value={this.state.inputValue} onChange={(input) => this.setState({inputValue: input.target.value})} />
                    <img onClick={this.sendMensage} src={SendIcon} className="sendIcon" />
                </div>
            </div>
        );
    }
}