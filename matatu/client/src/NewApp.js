import './styles/App.css';
import Header from './components/header';
import Hand from './components/NewHand';
import Card from './components/Card';
//import GameOver from './components/GameOver';
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';


let socket;

const NewApp = ({ location }) => {
    const [player, setPlayer] = useState('');
    const [game, setGame] = useState({});
    
    let ENDPOINT = '/'

    //handle joining the game room
    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            withCredentials: true,
        });

        socket.emit('joinRoom', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });      

    }, [ENDPOINT, location.search]);

    //handle update data calls
    useEffect(() => {
        socket.on('roomData', (room) => {
            console.log('client on roomData');
            console.log(room);
            setGame(room);
        });
    }, [game]);

    //handle player data
    useEffect(() => {
        socket.on('playerData', (player) => {
            console.log('client on playerData');
            console.log(player);
            setPlayer(player);
        });
    }, [player])

    if(!game.players) {
        return (
            <div>
                <Header text='Matatu!'/>
                <div className='App-body'>
                    <p>Connecting to server</p>
                </div>
            </div>
        )
    }
    console.log('game');
    console.log(game);
    return (
        <div>
            <Header text={`Welcome to ${game.name}, ${player.name}`}/>
            <div className='App-body'>
                <div className='H-stack' style={{backgroundColor: '#222f49'}}>
                    <div>
                        <p>Players in {game.name}</p>
                        <ul>
                            {game.players.map((p) => (
                                <li key={p.name}>{p.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
                <div className='H-stack'>
                    <div className='Deck' id='drawPile'>             
                    {game.deck.map((card) => (
                        <Card key={card.id} show={true} card={card}
                        className='Card'/>
                    ))}
                    </div>

                    <div className='Deck' id='drawPile'>             
                    {game.playPile.map((card) => (
                        <Card key={card.id} show={true} card={card}
                        className='Card'/>
                    ))}
                    </div>
                </div>
                <Hand player={player} 
                socket={socket}
                topCard={game.playPile.splice((game.playPile.length - 1), 1)}/>
            </div>
        </div>
        
    );
}

export default NewApp;
