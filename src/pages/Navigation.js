import React from 'react';
import Login from './login/Login';
import Home from './home/Home';
import Signup from './signup/Signup';

export default class Navigation extends React.Component{
    state = {
        pageShow: '',
        tokenUser: ''
    }

    componentDidMount(){
        var token = this.getToken();
        if(token !== '' && token !== undefined && token !== null){
            console.log(token);
            this.setState({
                tokenUser: token
            });
            this.redirect(true, 'Home');
        }else{
            this.redirect(true, 'Login');
        }
    }

    redirect = (redirect, to) => {
        if(redirect){
            this.setState({
                pageShow: to
            });
        }
    }

    setToken = (token) => {
        localStorage.setItem('[$tokenUser$]', token);
        this.setState({
            tokenUser: token
        });
        this.redirect(true, 'Home');
    }

    getToken = () => {
        return localStorage.getItem('[$tokenUser$]');
    }

    render(){
        return(
            this.state.pageShow === 'Login' ? <Login redirect={(redirect, to) => this.redirect(redirect, to)} setToken={(token) => this.setToken(token)} /> : 
            this.state.pageShow === 'Signup' ? <Signup redirect={(redirect, to) => this.redirect(redirect, to)} /> : 
            this.state.pageShow === 'Home' && <Home redirect={(redirect, to) => this.redirect(redirect, to)} token={this.state.tokenUser} />
        );
    }
}