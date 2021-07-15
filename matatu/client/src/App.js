import './styles/App.css';
import Header from './components/header/header';
import Card from './components/card/Card';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cards: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {}

  handleSubmit() {}

  getDeck() {
    fetch("/getCards")
      .then((res) => res.json())
      .then((data) => this.setState({cards: data.d}));
    console.log(this.state.cards);
  }

  render () {
    return (
      <div>
        <Header />
        <div className='App-body'>
        <Card suit='Heart' number={3}/>
        <Card suit='Heart' number={3}/>
        <Card suit='Heart' number={3}/>
        </div>
      </div>
      
    );
  }
}

export default App;
