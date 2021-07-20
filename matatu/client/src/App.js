import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      flip: false
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
    this.loadCards = this.loadCards.bind(this);
    this.flipAll = this.flipAll.bind(this);
  }
  

  handleChange() {}

  handleSubmit() {}

  async componentDidMount() {
    await fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        this.setState({cards: jsondata})
      });
  }

  loadCards() {
    let renderCards = this.state.cards.map((card) => (
      <Card key={card.id} suit={card.suit} 
      number={card.number} show={this.state.flip}/>
    ))
    return renderCards;
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
    return (
      <div>
        <Header />
        <button onClick={this.shuffleArray}>Shuffle</button>
        <button onClick={this.flipAll}>Flip All</button>
        <div className='App-body'>
        {this.loadCards()}
        </div>
      </div>
      
    );
  }
}

export default App;
