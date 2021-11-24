import React from 'react';
import './signup.css';
import Input from '../../components/input';
import Button from '../../components/button';
import Logo from '../../assets/chat.png';
import Alert from '../../components/alert';
import axios from 'axios';

export default class Signup extends React.Component{
    state = {
        Username: '',
        Password: '',
        ConfirmPassword: '',
        classInputPassword: 'input',
        classInputUsername: 'input',
        classInputConfirmPassword: 'input',
        alerts: [],


        typeAlert: '',
        positionAlert: '',
        textAlert: ''
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

    signup = () => {
        this.setState({classInputPassword: 'input', classInputUsername: 'input',classInputConfirmPassword: 'input'});
        if(this.state.Password === '' || this.state.Username === '' || this.state.ConfirmPassword === ''){
            this.showAlert('error','bottom-left','Fill in all fields!!');
            this.setState({
                classInputPassword: this.state.Password === '' ? 'inputRed' : 'input',
                classInputUsername: this.state.Username === '' ? 'inputRed' : 'input',
                classInputConfirmPassword: this.state.ConfirmPassword === '' ? 'inputRed' : 'input'
            });
            return;
        }
        if(this.state.Password.length < 6){
            this.showAlert('error','bottom-left','Password must be at least 6 characters!!');
            this.setState({
                classInputPassword: 'inputRed',
                classInputConfirmPassword: 'inputRed'
            });
            return;
        }
        if(this.state.Password !== this.state.ConfirmPassword){
            this.showAlert('error','bottom-left','Passwords do not match!!');
            this.setState({
                classInputConfirmPassword: 'inputRed'
            });
            return;
        }

        var user = {
            Username: this.state.Username,
            Password: this.state.Password
        };

        axios.post('http://localhost:4000/user/', user).then(res => {
            if(res.status === 201){
                this.showAlert('success','bottom-left',res.data);
                setTimeout(function(){this.props.redirect(true, 'Login')}.bind(this), 3000);
            }else{
                this.showAlert('error','bottom-left',res.data);
            }
        });
    }

    render(){
        return(
            <div className="formLogin">
                <center><img src={Logo} alt="Logo" className="img" /></center>
                <p>Username:</p>
                <Input className={this.state.classInputUsername} type="text" value={this.state.Username} onChange={(input) => this.setState({Username: input.target.value})} />
                <p>Password:</p>
                <Input className={this.state.classInputPassword} type="password" value={this.state.Password} onChange={(input) => this.setState({Password: input.target.value})} />
                <p>Confirm password:</p>
                <Input className={this.state.classInputConfirmPassword} type="password" value={this.state.ConfirmPassword} onChange={(input) => this.setState({ConfirmPassword: input.target.value})} />
                <br /><br />
                <Button title="Signup" onClick={() => this.signup()} />
                <br /><br />
                <span>You have account ? <a onClick={() => this.props.redirect(true, 'Login')}>Login</a></span>
                {this.state.alerts.length > 0 && this.state.alerts.map(alert =>
                    <Alert type={alert.typeAlert} position={alert.positionAlert} text={alert.textAlert} number={alert.number}  />
                )}
            </div>
        );
    }
}
