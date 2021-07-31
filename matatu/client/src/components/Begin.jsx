import '../styles/App.css';
import Header from './header/header';
import React from 'react';

function Begin(props) {
    function onClick() {
        props.handleClick()
    }

    return (
        <div>
            <Header />
            <div className='App-body'>
                <div className='H-stack'>
                    <input type='button' 
                    value='Begin Game!'
                    onClick={onClick} />
                </div>
            </div>
        </div>
        
    );
}

export default Begin;