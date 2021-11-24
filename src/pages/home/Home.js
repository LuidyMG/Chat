import React from 'react';
import './home.css';
import Avatar from '../../components/Avatar';
import ChatLogo from '../../assets/chat.png';
import ListContact from '../../components/listContact';
import ItemBar from '../../components/itemBar';
import axios from 'axios';
import Chat from '../../components/chat';
import ButtonMenu from '../../components/buttonMenu';

export default class Home extends React.Component{
    state = {
        Username: '',
        ListFriends: [],
        windowBlock: false,
        windowRightActive: 'chat',
        contactSelect: '',
        contactNameSelect: '',
        menuMobile: false
    }

    componentDidMount(){
        var username = null;
        axios.get(`http://localhost:4000/user/userInfo/${this.props.token}`).then(res => {
            if(res.status === 200){
                this.setState({
                    Username: res.data.Username
                });
            }else{
                this.setState({
                    windowBlock: true
                });
            }
        });
    }

    modifyActiveWindowRight = (active) => {
        this.setState({windowRightActive: active});
    }

    showAndHideMenu = (exec) => {
        if(exec == 'window' && this.state.menuMobile){
            this.setState({menuMobile: !this.state.menuMobile});
        }else if(exec == 'button'){
            this.setState({menuMobile: !this.state.menuMobile});
        }
    }

    destroySession = () => {
        localStorage.removeItem('[$tokenUser$]');
        this.props.redirect(true, 'Login');
    }

    render(){
        var activeChat = false,activeAddContact = false;
        var modeListContact = '';
        switch(this.state.windowRightActive){
            case 'chat':
                activeChat = true;
                modeListContact = 'find';
                break;
            case 'addFriend':
                activeAddContact = true;
                modeListContact = 'chat';
                break;
            default:
                activeChat = true;
                modeListContact = 'find';
                break;
        }
        return(
            <div>
                {this.state.windowBlock && <div className="windowBlocked"><span>404 Error</span><span>Did can't found user!!</span></div>}
                <div className="window">
                    <div className={'windowLeft '+(this.state.menuMobile ? 'opacity' : '')} onClick={() => this.showAndHideMenu('window')}>
                        {this.state.contactSelect === '' && <div className="noContentChat"><img src={ChatLogo} /><span>Chat with your friends :)</span></div>}
                        {this.state.contactSelect !== '' &&
                            <Chat nameContactUser={this.state.contactNameSelect} tokenUser={this.props.token} idFriend={this.state.contactSelect} />
                        }
                    </div>
                    <ButtonMenu onClick={() => this.showAndHideMenu('button')} />
                    <div className={'windowRight '+(this.state.menuMobile ? 'mobileMenuShow' : '')}>
                        <div className="userInfo">
                            <Avatar tokenUser={this.props.token} width="60px" height="60px" viewIconEdit="visilble" />
                            <p>{this.state.Username}</p>
                        </div>
                        <div className="barNavigation">
                            <ItemBar nameIcon="chat" onClick={() => this.modifyActiveWindowRight('chat')} active={activeChat.toString()} />
                            <ItemBar nameIcon="addFriend" onClick={() => this.modifyActiveWindowRight('addFriend')} active={activeAddContact.toString()} />
                            <ItemBar nameIcon="getOut" onClick={() => this.destroySession()} active="false" />
                        </div>
                        <div className="listFriendsUser">
                            <ListContact mode={modeListContact} tokenUser={this.props.token} selectContact={(contactId,contactName) => this.setState({contactSelect: contactId,contactNameSelect: contactName})} /> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}