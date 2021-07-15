import './styles/App.css';
import Header from './components/header/header';
import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = {}

  }

  render () {
    return (
      <div>
        <Header />
        <div className='App-body'>
        <div className='Card'><p>test</p></div>
        <div className='Card'><p>test</p></div>
        </div>
      </div>
      
    );
  }
}

export default App;
