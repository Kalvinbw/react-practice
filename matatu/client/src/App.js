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
      hand: {hCards: [], turn: true},
      oppHand: {hCards: [], turn: false}
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.flipAll = this.flipAll.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.ability = this.ability.bind(this);
  }
  

  handleDraw(card) {
    console.log('change called');
    //console.log(this.state);
    let newArray = this.state.cards.slice();
    let handArray = this.state.hand.turn ? 
      this.state.hand.hCards.slice() :
      this.state.oppHand.hCards.slice();

    for(let i = 0; i < newArray.length; i++) {
      if(newArray[i].id === card.id) {
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

  handlePlay(card) {
    console.log('play called');
    let hands = [this.state.hand.hCards.slice(), this.state.oppHand.hCards.slice()];
    let play = this.state.playDeck.slice();

    let p = this.state.hand.turn ? 0 : 1;
    if(play[play.length - 1].suit === card.suit || 
       play[play.length - 1].number === card.number) {
        let index = hands[p].findIndex(item => item.id === card.id);
        if(index !== -1) {
          let c = hands[p].splice(index, 1);
          play.push(c[0]);
        } else {
          alert('You cant do that');
        }
    }

    this.setState({
      hand: {hCards: hands[0], turn: !this.state.hand.turn},
      oppHand: {hCards: hands[1], turn: !this.state.oppHand.turn},
      playDeck: play
    });

  }

  ability() {

  }

  handleSubmit() {}

  async componentDidMount() {
    await fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        this.setState({cards: jsondata})
      });
    this.shuffleArray();

    let cards = this.state.cards.slice();
    let h = cards.splice(0,4);
    let op = cards.splice(0,4);
    let p = cards.splice(0,1);
    let setCards = this.playable([h, op], p[0]);
    this.setState({
      hand: {hCards: setCards[0], turn: this.state.hand.turn},
      oppHand: {hCards: setCards[1], turn: this.state.oppHand.turn},
      playDeck: p
    });
  }

  playable(cards, topCard) {
    for(let i = 0; i < cards.length; i++) {
      for(let j = 0; j < cards[i].length; j++) {
        if(cards[i][j].suit === topCard.suit
          || cards[i][j].number === topCard.number) {
            console.log('i tried');
            cards[i][j].canPlay = true;
          }
      }
    }
    return cards;
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

  doNothing() {
    return;
  }

  render () {
    let turn = this.state.hand.turn ? 'Your Turn' : "Opponent's Turn";

    return (
      <div>
        <Header />
        <div className='App-body'>
          <Hand cards={this.state.oppHand.hCards} 
          turn={this.state.oppHand.turn}
          topCard={this.state.playDeck[this.state.playDeck.length - 1]}
          action={this.state.oppHand.turn ? 
            this.handlePlay : this.doNothing}/>
          <div className='H-stack'>
            <div className='Deck' id='drawPile'>             
              {this.state.cards.map((card) => (
                <Card key={card.id} show={this.state.flip} card={card}
                className='Card' handleChange={this.handleDraw}/>
              ))}
            </div>
            <div className='Deck' id='playPile'>
              {this.state.playDeck.map((p) => (
                <Card key={p.id} show={true} card={p}
                className='Card' handleChange={this.doNothing}/>
                ))}
            </div>
            <p>{turn}</p>
          </div>
          <Hand cards={this.state.hand.hCards} 
          turn={this.state.hand.turn}
          topCard={this.state.playDeck[this.state.playDeck.length - 1]}
          action={this.state.hand.turn ? 
            this.handlePlay : this.doNothing}/>
        </div>
      </div>
      
    );
  }
}

export default App;
