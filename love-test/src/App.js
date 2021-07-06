import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
const myjs = require('./js/parseNames');
let holdArray = require('./js/output');


function Header() {
  return (
    <div class="header">
        <h1 class="header">Is it Love?</h1>
    </div>
  );
}



class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e)
  }

  render() {
    return (
        <label>
          {this.props.label}:
          <input 
            type="text" 
            class="textbox"
            value={this.props.value}
            name={this.props.name} 
            onChange={this.handleChange} 
            placeHolder={this.props.placeHolder ? this.props.placeHolder : ''} />
        </label>
    );
  }
}

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lovePhrase: '', personOne: '', personTwo: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value
    this.setState({[nam]: val})
  }

  handleSubmit(event) {
    event.preventDefault();
    myjs.parseNames(this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <InputBox 
            label={'What is the "Love Phrase"?'} 
            name={'lovePhrase'}
            value={this.state.lovePhrase}
            placeHolder={'ex. I will love you forever'} 
            onChange={this.handleChange} />
          <br></br><br></br>
          <InputBox 
            label={"Enter the first person's first and last names: "} 
            name={"personOne"} 
            value={this.state.personOne}
            onChange={this.handleChange} />
          <br></br><br></br>
          <InputBox 
            label={"Enter the second person's first and last names: "} 
            name={"personTwo"} 
            value={this.state.personTwo}
            onChange={this.handleChange} />
          <br></br><br></br>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <Outfield />
        </div>

      </div>
    );
  }
}

class Outfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {result: holdArray[holdArray.length - 1]};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({result: holdArray[holdArray.length - 1]});
  }
  render() {
    return (
      <p>{this.state.result}</p>
    );
  }

}

function App() {
  return (
    <div>
      <Header />
      <MainForm />
    </div>
  );
}

export default App;

//The classic react app page

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// );