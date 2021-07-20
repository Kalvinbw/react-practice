import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
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

  shuffleArray() {
    //console.log(this.state.cards);
    let array = this.state.cards;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    this.setState({cards: array});
  }

  render () {
    return (
      <div>
        <Header />
        <button onClick={this.shuffleArray}>Shuffle</button>
        <div className='App-body'>
        {this.state.cards.map((card) => (
          <Card key={card.id} suit={card.suit} number={card.number}/>
        ))}
        </div>
      </div>
      
    );
  }
}

export default App;
