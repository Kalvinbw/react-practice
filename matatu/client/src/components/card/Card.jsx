import React from 'react';
import logo from '../../assets/logo.svg';

class Card extends React.Component {
    constructor() {
        super()
        this.state = {
            show: true
        }
        
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        let toggle = !this.state.show;
        this.setState({show: toggle});
    }

    render() {
        if(this.state.show){
            return (
                <div className='Card' onClick={this.onClick}>
                    <h6>{this.props.suit}</h6>
                    <img src={logo} alt='react logo'></img>
                    <h6>{this.props.number}</h6>
                </div>
            );
        } else {
            return (
                <div className='Card' onClick={this.onClick}>
                    <img src={logo} alt='react logo'></img>
                    <h6>Click to show value</h6>
                </div>
            );
        }
        
    }
}

export default Card;