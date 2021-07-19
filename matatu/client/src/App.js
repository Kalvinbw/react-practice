import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  state = {
    cards: []
  }

  handleChange() {}

  handleSubmit() {}

  componentDidMount() {
    fetch("/getCards")
      .then(res => res.json())
      .then(jsondata => {
        this.setState({cards: jsondata})
      }); 
      this.renderItems();
  }

  renderItems() {
    console.log('inside renderItems');
    console.log(this.state.cards);
  }

  render () {
    return (
      <div>
        <Header />
        <div className='App-body'>
        {this.state.cards.map((card) => (
          <div key={card.id}>
            <Card key={card.id} suit={card.suit} number={card.number}/>
          </div>
        ))}
        <Card suit='Heart' number={3}/>
        <Card suit='Heart' number={3}/>
        </div>
      </div>
      
    );
  }
}

export default App;
