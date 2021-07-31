import '../styles/App.css';
import Header from './header/header';
import React from 'react';

function GameOver(props) {
    return (
        <div>
            <Header />
            <div className='App-body'>
                <div className='H-stack'>
                    <p className='App-link'>
                        Thanks for playing!
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default GameOver;