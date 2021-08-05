import './styles/App.css';
import Header from './components/header';
import Hand from './components/NewHand';
import Card from './components/Card';
import GameOver from './components/GameOver';
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';


let socket;

const NewApp = ({ location }) => {
    const [gameOver, setGameOver] = useState(false);
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const [playDeck, setplayDeck] = useState([]);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [players, setplayers] = useState([]);
    
    let ENDPOINT = '/'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT, {
            withCredentials: true,
        });

        setRoom(room);
        setName(name);
        setplayers([...players, {name, room}]);

        socket.emit('joinRoom', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });

        fetch("/getCards")
            .then(res => res.json())
            .then(jsondata => {
                let d = shuffleArray(jsondata);
                let mycards = d.splice(0,4);
                let topCard = d.splice(0,1);
                setDeck(d);
                setplayDeck(topCard);
                setCards(mycards);
            }).catch(e => console.log(e));
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('playCalled', () => {
            alert('play called!');
        });

        socket.on('roomData', ({players}) => {
            setplayers(players);
        });
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        //this.setState({cards: array});
        return array;
    }


    return (
        <div>
            <Header text={`Welcome to ${room}, ${name}`}/>
            <div className='App-body'>
                <div className='H-stack' style={{backgroundColor: '#222f49'}}>
                    <div>
                        <p>Players in {room}</p>
                        <ul>
                            {players.map((p) => (
                                <li key={p.name}>{p.name}</li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
                <div className='H-stack'>
                    <div className='Deck' id='drawPile'>             
                    {deck.map((card) => (
                        <Card key={card.id} show={true} card={card}
                        className='Card'/>
                    ))}
                    </div>
                </div>
                <Hand hand={cards} />
            </div>
        </div>
        
    );
}

export default NewApp;
