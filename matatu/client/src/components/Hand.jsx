import '../styles/App.css';
import React from 'react';
import Card from './card/Card';

class Hand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hand: []}
        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay(card) {
        console.log('Play called from hand');
        
    }

    render() {
        return (
            <div className='H-stack' style={{backgroundColor: '#222f49'}}>
                {this.props.cards.map((c) => (
                <Card key={c.id} show={true} card={c}
                className='Hand' handleChange={this.props.action}/>))}
            </div>
        );
    }
}

export default Hand;