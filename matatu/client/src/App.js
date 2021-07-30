import './styles/App.css';
import Header from './components/header/header';
import Hand from './components/Hand';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      playDeck: [],
      players: [
        {cards: [],
        turn: true,
        playCalled: false},
        {cards: [],
        turn: false,
        playCalled: false}
      ],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.flipAll = this.flipAll.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.callPlay = this.callPlay.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  async componentDidMount() {
    await fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        this.setState({cards: jsondata})
      });
    this.shuffleArray();

    let cards = this.state.cards.slice();
    let players = [...this.state.players];
    for(let i = 0; i < players.length; i++) {
      players[i].cards = cards.splice(0,4);
    }
    let topCard = cards.splice(0,1);
    this.setState({
      players: players,
      playDeck: topCard
    });
  }

  shuffleArray() {
    //console.log(this.state.cards);
    let array = this.state.cards;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    this.setState({cards: array});
  }

  handleDraw(card) {
    // get needed variables
    let playerID = 0;
    let cards = this.state.cards.slice();
    let players = [...this.state.players];
    for(let i = 0; i < players.length; i++) {
      if(players[i].turn) {
        playerID = i;
        break;
      }
    }
    let playerCards = players[playerID].cards.slice();

    //add proper card to the hand of the player
    for(let i = 0; i < cards.length; i++) {
      if(cards[i].id === card.id) {
        let c = cards.splice(i, 1);
        playerCards.push(c[0]);
        break;
      }
    }
    players[playerID].cards = playerCards;

    // change turn to the next player
    let nextTurn = (playerID === players.length - 1) ? 0 : playerID + 1;
    players[nextTurn].turn = !players[nextTurn].turn;
    players[playerID].turn = !players[playerID].turn;

    //set state
    this.setState({
      cards: cards,
      players: players
    });
  }

  callPlay() {
    console.log('play called');
    let players = this.state.players;
    for(let i = 0; i < players.length; i++) {
      if(players[i].turn) {
        players[i].playCalled = true;
        this.setState({players: players}, console.log(this.state));
      }
    }
  }

  handlePlay(playedCards) {
    console.log('handle play called from app');
    let playerNum;
    let players = [...this.state.players];
    let playPile = [...this.state.playDeck];

    for(let i = 0; i < players.length; i++) {
      if(players[i].turn) {
        playerNum = i;
        break;
      }
    }

    players[playerNum].playCalled = false;
    for(let i = 0; i < playedCards.length; i++) {
      for(let j = 0; j < players[playerNum].cards.length; j++) {
        //push card to play pile if it matches the id given
        if(playedCards[i].id === players[playerNum].cards[j].id) {
          let card = players[playerNum].cards.splice(j, 1);
          playPile.push(card[0]);
        }
      }
    }

     // change turn to the next player
     let nextTurn = (playerNum === players.length - 1) ? 0 : playerNum + 1;
     players[nextTurn].turn = !players[nextTurn].turn;
     players[playerNum].turn = !players[playerNum].turn;

    this.setState({
      playDeck: playPile,
      players: players
    }, console.log(this.state));
  }

  handleSubmit() {}

  flipAll() {
    let toggle = !this.state.flip;
    this.setState({flip: toggle});
  }

  doNothing() {
    return;
  }

  render () {
    return (
      <div>
        <Header />

        <div className='App-body'>
          <Hand id={1} player={this.state.players[1]} 
          topCard={this.state.playDeck[this.state.playDeck.length - 1]}
          action={this.state.players[1].turn ? 
            this.handlePlay : this.doNothing}/>

          <div className='H-stack'>

            <div className='Deck' id='drawPile'>             
              {this.state.cards.map((card) => (
                <Card key={card.id} show={false} card={card}
                className='Card' handleChange={this.handleDraw}/>
              ))}
            </div>

            <div className='Deck' id='playPile'>
              {this.state.playDeck.map((p) => (
                <Card key={p.id} show={true} card={p}
                className='Card' handleChange={this.doNothing}/>
                ))}
            </div>

            <p>{this.state.players[0].turn ? 'Your Turn' : "Opponent's Turn"}</p>

            <input type='button' onClick={this.callPlay} value='Play Selected Card(s)'/>
          </div>

          <Hand id={0} player={this.state.players[0]} 
          topCard={this.state.playDeck[this.state.playDeck.length - 1]}
          action={this.state.players[0].turn ? 
            this.handlePlay : this.doNothing}/>

        </div>

      </div>
      
    );
  }
}

export default App;
