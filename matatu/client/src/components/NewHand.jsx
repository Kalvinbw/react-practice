import '../styles/App.css';
import React, {useState, useEffect} from 'react';
import Card from './Card';

const Hand = (props) => {
    return (
        <div className="H-stack" style={{backgroundColor: '#222f49'}}>
             {props.hand.map((c) => (
            <Card key={c.id} show={true} card={c}
            className='Hand' />
        ))}
        </div>
    )
}

export default Hand