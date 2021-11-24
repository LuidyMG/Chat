import React from 'react';
import './avatar.css';
import axios from 'axios';
import person from '../assets/person.png';
import person2 from '../assets/person2.png';
import iconAdd from '../assets/iconAdd.png';
import Alert from './alert';

export default class Avatar extends React.Component{
    state = {
        img: '',
        alerts: []
    }

    componentDidMount(){
        /*axios.get(`http://localhost:4000/imgUser/${this.props.tokenUser}`).then(res => {
            console.log(res);
            if(res.status === 200){
                this.setState({img: res.data});
            }
        });*/
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

    file = (value) => {
        var reader = new FileReader();
        reader.onloadend = () => {
            var imgUser = {
                UserId: this.props.tokenUser,
                Img: reader.result
            };
            /*axios.post(`http://localhost:4000/imgUser/`, imgUser).then(res => {
                if(res.status === 201){
                    this.setState({img: imgUser.Img});
                }else{

                }
            });*/
        }
        reader.readAsDataURL(document.querySelector('input[type=file]').files[0]);
    }

    render(){
        var imgPerson = this.props.inverted ?  person2 : person;
        var imgUser = this.state.img === '' ? imgPerson : this.state.img;
        return(
            <div className="circle" style={{width: this.props.width, height: this.props.height}}><img src={imgUser} style={{width: this.props.width, height: this.props.height}} /><div className={"iconAdd "+this.props.viewIconEdit}><img src={iconAdd} /><input type="file" className="inputHidden" onChange={(value) => this.file(value)} /></div></div>
        );
    }
}