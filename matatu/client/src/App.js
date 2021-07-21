import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      flip: false,
      hand: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.flipAll = this.flipAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  handleChange(ID) {
    let newArray = this.state.cards.slice();
    let handArray = this.state.hand.slice();
    for(let i = 0; i < newArray.length; i++) {
      if(newArray[i].id === ID) {
        console.log('match found!')
        let c = newArray.splice(i, 1);
        handArray.push(c[0]);
        break;
      }
    }
    this.setState({
      cards: newArray,
      hand: handArray
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
    let deckHand = <p className='App-link'>Hand</p>;
    if(this.state.hand.length > 0) {
      deckHand = this.state.hand.map((h) => (
        <Card key={h.id} id={h.id} suit={h.suit} 
        number={h.number} show={true} 
        className='Hand' handleChange={this.handleChange}/>
      ));
    }

    return (
      <div>
        <Header />
        <button onClick={this.shuffleArray}>Shuffle</button>
        <button onClick={this.flipAll}>Flip All</button>
        <div className='App-body'>
          <div className='H-stack'>
            <div className='Deck'>
              {this.state.cards.map((card) => (
                <Card key={card.id} id={card.id} suit={card.suit} 
                number={card.number} show={this.state.flip} 
                className='Card' handleChange={this.handleChange}/>
              ))}
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
