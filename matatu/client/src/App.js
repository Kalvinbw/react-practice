import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      playDeck: [],
      hand: {hCards: [], turn: true},
      oppHand: {hCards: [], turn: false}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.flipAll = this.flipAll.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }
  

  handleDraw(ID) {
    console.log('change called');
    //console.log(this.state);
    let newArray = this.state.cards.slice();
    let handArray = this.state.hand.turn ? 
      this.state.hand.hCards.slice() :
      this.state.oppHand.hCards.slice();

    for(let i = 0; i < newArray.length; i++) {
      if(newArray[i].id === ID) {
        let c = newArray.splice(i, 1);
        handArray.push(c[0]);
        break;
      }
    }
    if(this.state.hand.turn) {
      this.setState({
        cards: newArray,
        hand: {hCards: handArray, turn: !this.state.hand.turn},
        oppHand: {hCards: this.state.oppHand.hCards, turn: !this.state.oppHand.turn}
      });
    } else {
      this.setState({
        cards: newArray,
        hand: {hCards: this.state.hand.hCards, turn: !this.state.hand.turn},
        oppHand: {hCards: handArray, turn: !this.state.oppHand.turn}
      });
    }
    
  }

  handlePlay(ID) {
    console.log('play called');
    let hands = [this.state.hand.hCards.slice(), this.state.oppHand.hCards.slice()];
    let play = this.state.playDeck.slice();

    let p = this.state.hand.turn ? 0 : 1;
    for(let i = 0; i < hands[p].length; i++) {
      if(hands[p][i].id === ID) {
        let c = hands[p].splice(i, 1);
        play.push(c[0]);
        break;
      }
    }
    console.log(play);
    this.setState({
      hand: {hCards: hands[0], turn: !this.state.hand.turn},
      oppHand: {hCards: hands[1], turn: !this.state.oppHand.turn},
      playDeck: play
    });

  }

  handleSubmit() {}

  async componentDidMount() {
    await fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        this.setState({cards: jsondata})
      });
    this.shuffleArray();
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

  flipAll() {
    let toggle = !this.state.flip;
    this.setState({flip: toggle});
  }

  render () {
    //load your hand
    let deckHand = <p className='App-link'>Your Hand</p>;
    if(this.state.hand.hCards.length > 0) {
      deckHand = this.state.hand.hCards.map((h) => (
        <Card key={h.id} id={h.id} suit={h.suit} 
        number={h.number} show={true} 
        className='Hand' handleChange={this.handlePlay}/>
      ));
    }

    //load opponents hand
    let opHand = <p className='App-link'>Opponent Hand</p>;
    if(this.state.oppHand.hCards.length > 0) {
      opHand = this.state.oppHand.hCards.map((h) => (
        <Card key={h.id} id={h.id} suit={h.suit} 
        number={h.number} show={true} 
        className='Hand' handleChange={this.handlePlay}/>
      ));
    }

    //load play pile
    let playPile = <p className='App-link'>Play Pile</p>;
    if(this.state.playDeck.length > 0) {
      console.log(this.state.playDeck);
      playPile = this.state.playDeck.map((p) => (
        <Card key={p.id} id={p.id} suit={p.suit} 
        number={p.number} show={true} 
        className='Card' handleChange={this.handleDraw}/>
      ));
    }

    let turn = this.state.hand.turn ? 'Your Turn' : 'Opponents Turn';

    return (
      <div>
        <Header />
        <div className='App-body'>
          <div className='H-stack' style={{backgroundColor: '#222f49'}}>
            {opHand}
          </div>
          <div className='H-stack'>
            <div className='Deck' id='drawPile'>             
              {this.state.cards.map((card) => (
                <Card key={card.id} id={card.id} suit={card.suit} 
                number={card.number} show={this.state.flip} 
                className='Card' handleChange={this.handleDraw}/>
              ))}
            </div>
            <p>{turn}</p>
            <div className='Deck' id='playPile'>
              {playPile}
            </div>
          </div>
          <div className='H-stack' style={{backgroundColor: '#222f49'}}>
            {deckHand}
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
