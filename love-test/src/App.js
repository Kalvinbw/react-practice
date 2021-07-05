import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

function Header() {
  return (
    <div class="header">
        <h1 class="header">Is it Love?</h1>
    </div>
  );
}

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('Text submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputBox name={'What is the "Love Phrase"?'} placeHolder={'ex. I will love you forever'} id={"lovePhrase"} />
        <InputBox name={"Enter the first person's first and last names: "} placeHolder={'ex. John Doe'} id={"personOne"} />
        <InputBox name={"Enter the second person's first and last names: "} placeHolder={'ex. Jane Doe'} id={"personTwo"} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <label>
          {this.props.name}:
          <input type="text" class="textbox" id={this.props.id} value={this.state.value} onChange={this.handleChange} placeHolder={this.props.placeHolder} />
        </label>
        <br></br>
      </div>
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