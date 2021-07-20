import React from 'react';
import logo from '../../assets/logo.svg';

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    onClick() {
        let toggle = !this.state.show;
        this.setState({show: toggle});
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.show !== prevProps.show){
            this.setState({show: this.props.show});
        }
    }

    render() {
        if(this.state.show){
            return (
                <div className='Card flipped' onClick={this.onClick}>
                    <h6>{this.props.suit}</h6>
                    <img src={logo} alt='react logo'></img>
                    <h6>{this.props.number}</h6>
                </div>
            );
        } else {
            return (
                <div className='Card' onClick={this.onClick}>
                    <img src={logo} alt='react logo'></img>
                    <h6>Click to flip</h6>
                </div>
            );
        }
        
    }
}

export default Card;