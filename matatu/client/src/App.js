import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {}

  handleSubmit() {}

  componentDidMount() {
    this.getDeck();
    this.renderItems();
  }

  getDeck() {
    fetch("/getCards")
      .then((res) => this.setState({cards: [res.data]}));
    console.log(this.state.cards);
  }

  renderItems() {
    return this.state.cards.map(card => (
      <Card suit={card.suit} number={card.number} />
    ));
  }

  render () {
    return (
      <div>
        <Header />
        <div className='App-body'>
        {this.renderItems()}
        <Card suit='Heart' number={3}/>
        <Card suit='Heart' number={3}/>
        </div>
      </div>
      
    );
  }
}

export default App;
