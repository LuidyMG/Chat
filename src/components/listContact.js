import React from 'react';
import './listContact.css';
import axios from 'axios';
import Contact from './contact';
import Input from './input';
import { read } from 'fs';
import IconSearch from '../assets/iconSearch.png';
import socketIOClient from "socket.io-client";

var socket;
export default class ListContact extends React.Component{
    state = {
        list: [],
        listFilter: [],
        listUserAdd: [],
        listUser: [],
        mode: '',
        inputSearch: '',
        boardContentFriendsRequest: false,
        boardContentFriends: true,
        countFriendsRequest: 0,
        countFriends: 0,
        contactSelect: ''
    }

    componentDidMount() {
        this.requestContact();
        socket = socketIOClient('http://localhost:4000');
        socket.on('eventFriendsModify', (data) => {
            if(data !== this.props.tokenUser){
                this.requestContact();
            }
        }); 
    }

    requestContact = () => {
        axios.get(`http://localhost:4000/user/users/${this.props.tokenUser}`).then(res => {
            this.setState({listUser: res.data !== 'No users found!!' ? res.data : []}); 
            axios.get(`http://localhost:4000/user/friends/${this.props.tokenUser}`).then(res => {
                if(res.status === 200){
                    if(res.data !== 'No information found!!'){
                        var listUserAdd = res.data;
                        var count = 0;
                        var countFriends = 0;
                        listUserAdd.map((user) => user.Active ? countFriends++ : count++);
                        this.setState({listUserAdd: res.data, countFriendsRequest: count, countFriends });

                        var listUser = this.state.listUser;
                        var list = [];
                        listUser.map((user) => listUserAdd.findIndex(useradd => useradd.Id === user.Id) < 0 && list.push(user));
                        this.setState({list,listFilter:list});
                    }
                }
            });
        });
    }

    selectContact = (idContact,nameContact) => {
        this.props.selectContact(idContact,nameContact);
        this.setState({contactSelect: idContact});
    }

    changeValueSearch = (input) => {
        var listFilter = [];
        var list = this.state.list;
        list.map(user => ((user.Username).toString()).toLowerCase().indexOf((input.target.value).toLowerCase()) >= 0 && listFilter.push(user));
        this.setState({inputSearch: input.target.value,listFilter: listFilter});
    }

    render(){
        return(
            <div>
                {this.props.mode === 'chat' && 
                    <div className="searchContact">
                        <Input className="input square" type="text" value={this.state.inputSearch} onChange={(input) => this.changeValueSearch(input)} />
                        <img className="iconSearch" src={IconSearch} />
                    </div>
                }
                {this.props.mode === 'chat' &&
                    this.state.listFilter.map((user, i) => 
                        <Contact key={i} nameContact={user.Username} tokenUser={this.props.tokenUser} idContact={user.Id} nameIcon="add" active={false} invited={false} add={true} inviteContact={() => this.requestContact()} />
                    )
                }
                {this.props.mode === 'find' && <div>
                        <div className="boardBrand" onClick={() => this.setState({boardContentFriendsRequest: !this.state.boardContentFriendsRequest})}><span>{this.state.boardContentFriendsRequest ? 'v' : '>' }</span><span>Friend requests:</span><span>{this.state.countFriendsRequest}</span></div>
                        <div className="boardContent" style={!this.state.boardContentFriendsRequest ? {display: 'none'} : {}}>
                            {this.state.countFriendsRequest === 0 && <p className="notFound">No pending friend requests</p>}
                            {this.state.listUserAdd.map((user, i) => 
                                !user.Active && <Contact key={i} nameContact={user.Username} tokenUser={this.props.tokenUser} idContact={user.Id} nameIcon="" invited={user.Invited} active={user.Active} inviteContact={() => this.requestContact()} />
                            )}
                        </div>
                        <div className="boardBrand" onClick={() => this.setState({boardContentFriends: !this.state.boardContentFriends})}><span>{this.state.boardContentFriends ? 'v' : '>' }</span><span>Friends:</span></div>
                        <div className="boardContent" style={!this.state.boardContentFriends ? {display: 'none'} : {}}>
                        {this.state.countFriends === 0 && <p className="notFound">No friends found</p>}
                            {this.state.listUserAdd.map((user, i) => 
                                user.Active && <span onClick={() => this.selectContact(user.Id,user.Username)}><Contact key={i} nameContact={user.Username} tokenUser={this.props.tokenUser} idContact={user.Id} nameIcon="" contactSelect={this.state.contactSelect === user.Id} invited={user.Invited} active={user.Active} inviteContact={() => this.requestContact()} /></span>
                            )}
                        </div>
                    </div>
                }
            </div>
        );
    }
}