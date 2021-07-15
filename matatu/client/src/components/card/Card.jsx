import React from 'react';

class Card extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className='Card'>
                <h6>{this.props.suit}</h6>
                <p>{this.props.number}</p>
            </div>
        );
    }
}

export default Card;