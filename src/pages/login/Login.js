import React from 'react';
import './login.css';
import Input from '../../components/input';
import Button from '../../components/button';
import Logo from '../../assets/chat.png';
import Alert from '../../components/alert';
import axios from 'axios';

export default class Login extends React.Component{
    state = {
        Username: '',
        Password: '',
        classInputUsername: 'input',
        classInputPassword: 'input',
        alerts: []
    }

    hideAlert = (number) => {
        var alerts = this.state.alerts;
        alerts.indexOf(alert => alert.number === number);
        alerts.splice(0, 1);
        this.setState({
            alerts
        });
    }

    showAlert = (typeAlert, positionAlert, textAlert) => {
        var alert = {
            typeAlert: typeAlert,
            positionAlert: positionAlert,
            textAlert: textAlert,
            number: (this.state.alerts.length)+1
        }
        var alerts = this.state.alerts;
        alerts.push(alert);
        this.setState({alerts});
        setTimeout(function(){ this.hideAlert(alert.number) }.bind(this), 5010);
    }

    login = () => {
        this.setState({classInputPassword: 'input', classInputUsername: 'input'});
        if(this.state.Password === '' || this.state.Username === ''){
            this.showAlert('error','bottom-left','Fill in all fields!!');
            this.setState({
                classInputPassword: this.state.Password === '' ? 'inputRed' : 'input',
                classInputUsername: this.state.Username === '' ? 'inputRed' : 'input'
            });
            return;
        }

        var user = {
            Username: this.state.Username,
            Password: this.state.Password
        };

        axios.get(`http://localhost:4000/user/${user.Username}[$_$]${user.Password}`).then(res => {
            if(res.status === 201 && res.data !== false){
                this.showAlert('success','bottom-left','Successfully logged in!!');
                setTimeout(function(){this.props.setToken(res.data)}.bind(this), 3000);
            }else{
                this.showAlert('error','bottom-left','Error in login!!');
            }
        })
    }

    render(){
        return(
            <div className="formLogin">
                <center><img src={Logo} alt="Logo" className="img" /></center>
                <p>Username:</p>
                <Input className={this.state.classInputUsername} type="text" value={this.state.Username} onChange={(input) => this.setState({Username: input.target.value})}/>
                <p>Password:</p>
                <Input className={this.state.classInputUsername} type="password" value={this.state.Password} onChange={(input) => this.setState({Password: input.target.value})}/>
                <br /><br />
                <Button title="Login" onClick={() => this.login()} />
                <br /><br />
                <span>You not have account ? <a onClick={() => this.props.redirect(true, 'Signup')}>Signup</a></span>
                {this.state.alerts.length > 0 && this.state.alerts.map(alert =>
                    <Alert type={alert.typeAlert} position={alert.positionAlert} text={alert.textAlert} number={alert.number}  />
                )}
            </div>
        );
    }
}
