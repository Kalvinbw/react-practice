//import logo from './logo.svg';
import './App.css';
import React from 'react';
const myjs = require('./js/parseNames');



function Header() {
  return (
    <div className="header">
        <h1 className="header">Is it Love?</h1>
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
            className="textbox"
            value={this.props.value}
            name={this.props.name} 
            onChange={this.handleChange} 
            placeholder={this.props.placeHolder ? this.props.placeHolder : ''} />
        </label>
    );
  }
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      checked: true
    }
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <label className="container">
        <input 
          type="checkbox" 
          name={this.props.name}
          checked={this.props.checked} 
          onChange={this.handleChange}></input>
        <span className="checkmark"></span>
        {this.props.label}
      </label>
    );
  }

}

class MainForm extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {lovePhrase: '', personOne: '', personTwo: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event);
  }

  handleSubmit(event) {
    this.props.onSubmit(event)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputBox 
          label={'What is the "Love Phrase"?'} 
          name={'lovePhrase'}
          value={this.props.lovePhrase}
          placeholder={'ex. I will love you forever'} 
          onChange={this.props.onChange} />
        <br></br><br></br>
        <InputBox 
          label={"Enter the first person's full name"} 
          name={"personOne"} 
          value={this.props.personOne}
          onChange={this.props.onChange} />
        <br></br><br></br>
        <InputBox 
          label={"Enter the second person's full name"} 
          name={"personTwo"} 
          value={this.props.personTwo}
          onChange={this.props.onChange} />
        <br></br><br></br>
        <Checkbox 
          label="We will communicate often" 
          name='communicate' 
          checked={this.props.communicate} 
          onChange={this.props.onChange} />
          <Checkbox 
          label="We will not be selfish" 
          name='selfish' 
          checked={this.props.selfish} 
          onChange={this.props.onChange} />
          <Checkbox 
          label="We will serve each other often" 
          name='serve' 
          checked={this.props.serve} 
          onChange={this.props.onChange} />
          <Checkbox 
          label="We will be each other's best friend" 
          name='friends' 
          checked={this.props.friends} 
          onChange={this.props.onChange} />
          <Checkbox 
          label="We will remember God" 
          name='god' 
          checked={this.props.god} 
          onChange={this.props.onChange} />
        
        <input type="submit" className="button" value="Submit" onSubmit={this.handleSubmit}/>
      </form>
    );
  }
}

function Outfield(props) {
  return (
    <div className="center">
      <p>{props.result}</p>
    </div>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      lovePhrase: '', 
      personOne: '', 
      personTwo: '',
      communicate: false,
      selfish: true,
      serve: true,
      friends: true,
      god: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({[nam]: val})
  }

  handleSubmit(event) {
    event.preventDefault();
    let r = myjs.parseNames(this.state);
    this.setState({result: r[0]});
  }

  render() {
    let out;
    if (this.state.result !== '') {
      out = <Outfield result={this.state.result} />;
    }
    else {
      out = <p></p>;
    }
    return (
      <div>
        <Header />
        <div className="center">
          <MainForm onChange={this.handleChange} onSubmit={this.handleSubmit} s={this.state}/>
        </div>
        {out}
      </div>
    );
  }
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