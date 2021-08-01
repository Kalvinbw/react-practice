import '../styles/App.css';
import Header from './header/header';
import React from 'react';

function GameOver(props) {
    console.log(props.players);
    return (
        <div>
            <Header />
            <div className='App-body'>
                <div>
                    <p className='App-link'>
                        Thanks for playing!
                    </p>
                    {props.players.map((player) => (
                        <p>Player {player.id}: {player.score}</p>
                    ))}
                </div>
            </div>
        </div>
        
    );
}

export default GameOver;