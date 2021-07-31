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
    this.handleDraw = this.handleDraw.bind(this);
    this.callPlay = this.callPlay.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  async componentDidMount() {
    await fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        let cards = this.shuffleArray(jsondata);
        let players = [...this.state.players];
        for(let i = 0; i < players.length; i++) {
          players[i].cards = cards.splice(0,4);
        }
        let topCard = cards.splice(0,1);
        this.setState({
          cards: cards,
          players: players,
          playDeck: topCard
        });
      });
  }

  shuffleArray(array) {
    //console.log(this.state.cards);
    //let array = this.state.cards;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //this.setState({cards: array});
    return array;
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

    for(let i = 0; i < players.length; i++) {
      for(let j = 0; j < players[i].cards.length; j++) {
        players[i].cards[j].canPlay = false;
        players[i].cards[j].selected = false;
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
    //console.log('play called');
    let players = this.state.players;
    for(let i = 0; i < players.length; i++) {
      if(players[i].turn) {
        players[i].playCalled = !players[i].playCalled;
        this.setState({players: players});
      }
    }
  }

  handlePlay(playedCards) {
    //console.log('handle play called from app');
    if(!playedCards) {
      this.callPlay();
      return;
    }
    let playerNum;
    let players = [...this.state.players];
    let playPile = [...this.state.playDeck];

    //get the player id who's turn it is
    for(let i = 0; i < players.length; i++) {
      if(players[i].turn) {
        playerNum = i;
        break;
      }
    }

    //set play called to false
    players[playerNum].playCalled = false;

    //loop through played cards and move them to the pile
    let ability;
    for(let i = 0; i < playedCards.length; i++) {
      console.log(playedCards[0].id)
      if(playedCards[i].ability !== false) {ability = true}
      for(let j = 0; j < players[playerNum].cards.length; j++) {
        //push card to play pile if it matches the id given
        if(playedCards[i].id === players[playerNum].cards[j].id) {
          let card = players[playerNum].cards.splice(j, 1);
          playPile.push(card[0]);
        }
      }
    }

    let nextTurn = (playerNum === players.length - 1) ? 0 : playerNum + 1;

    if(ability) {
      console.log(nextTurn);
      this.abilites(playedCards, players, nextTurn);
      return;
    }

     // change turn to the next player
     players[nextTurn].turn = !players[nextTurn].turn;
     players[playerNum].turn = !players[playerNum].turn;

    this.setState({
      playDeck: playPile,
      players: players
    });
  }

  abilites(cards, players, id) {
    console.log(cards[0].ability)
    switch(cards[0].ability) {
      case 'Draw 2':
        this.drawExtra(players, 2, id, cards);
        break;
      case 'Draw 4':
        this.drawExtra(players, 4, id, cards);
        break;
      case 'Draw 5':
        this.drawExtra(players, 5, id, cards);
        break;
      case 'Skip Turn':
        this.skipTurn();
        break;
      default:
        return -1;
    }
  }

  drawExtra(players, drawAmount, nextid, cards) {
    console.log('draw extra called');
    let deck = [...this.state.cards];
    let play = [...this.state.playDeck];
    console.log(deck.length);
    for(let i = 0; i < cards.length; i++) {
      let extra = deck.splice(0, drawAmount);
      players[nextid].cards.push(...extra);
    }
    console.log(players[nextid]);

    // players[nextid].turn = !players[nextid].turn;
    // let x = (nextid === 0) ? players.length - 1 : nextid - 1;
    // players[x].turn = !players[x].turn;

    play.push(...cards);

    this.setState({
      cards: deck,
      playDeck: play,
      players: players
    })
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

            <p className={this.state.players[0].turn ? 'App-link' : null}>
              {this.state.players[0].turn ? 'Your Turn' : "Opponent's Turn"}
            </p>

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
