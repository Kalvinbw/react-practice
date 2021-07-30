import React from 'react';
import logo from '../../assets/logo.svg';

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false
        }
        
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onClick() {
        this.props.handleChange(this.props.card)
    }

    componentDidMount() {
        if(this.props.show) {
            this.setState({show: true});
        }
    }

    handleChange() {
        this.props.handleChange();
    }

    componentDidUpdate(prevProps) {
        if(this.props.show !== prevProps.show){
            this.setState({show: this.props.show});
        }
    }

    render() {
        if(this.state.show){
            let c = this.props.className === 'Hand' ? 'Hand flipped' : 'Card flipped';
            c = this.props.card.canPlay ? c + ' playable' : c;
            return (
                <div className={c} onClick={this.onClick}>
                    <h6>{this.props.card.suit}</h6>
                    <img src={logo} alt='react logo'></img>
                    <h6>{this.props.card.number}</h6>
                </div>
            );
        } else {
            return (
                <div className={this.props.className} onClick={this.onClick}>
                    <img src={logo} alt='react logo'></img>
                    <h6>Click to draw</h6>
                </div>
            );
        }
        
    }
}

export default Card;