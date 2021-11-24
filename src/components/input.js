import React from 'react';
import reactDom from 'react-dom';
import './input.css';
import IconSearch from '../assets/iconSearch.png';

export default class Input extends React.Component{
    render(){
        return(
            <input {...this.props} />
        );
    }
}