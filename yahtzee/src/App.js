import logo from './images/YahtzeePic.png';
import images from './images';
import './App.css';
import React from 'react';
let rollDie = require('./js/rollDice');

function Header(props) {
  return (
    <div className="heading">
      <div className="head_img">
        <img className="YahtzeeImg" src={logo} alt="Yahzee Logo"></img>
      </div>
    </div>
  );
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  handleSubmit(e) {
    this.props.onClick(e);
  }

  render() {
    return (
      <div className="inputArea">
        <label>
          <input 
            type="text" 
            name="chosenDie"
            onChange={this.handleChange}
            value={this.props.chosenDie}
            placeholder="Enter a number between 1-6"
            ></input>
        </label>
        <input type="button" value="Click to Roll" onClick={this.handleSubmit} />
      </div>
    );
  }

}

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    let final = [];
    let mynum = this.props.num !== 'undefined' ? this.props.num : 0;
    for (let i = 0; i < 6; i++) {
      final.push(<img key={images[i].id} src={images[mynum].src} alt="die"></img> )
    }
    return (
      <div className="dieImg">
        {final}
      </div>

    );
  }
}

class DieArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {array: images}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <div className="inputArea">
        <Dice num={this.props.num} onChange={this.props.onChange}/>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      chosenDie: 1,
      flag: false,
      imageArray: images
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let nam = e.target.name
    let num = parseInt(e.target.value)
    if (num < 1 || num > 6 || typeof(num) === 'undefined') {
      this.setState({flag: true, chosenDie: 1})
    } else {
      if (isNaN(num)) {
        num = 1
      }
      this.setState({[nam]: num, flag: false})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = rollDie(this.state.chosenDie);

    console.log(data);
  }

  render() {
    let arrNum = this.state.chosenDie - 1;
    let alert;
    if (this.state.flag === true) {
      alert = <div><p>Please enter a valid number between 1 and 6</p></div>;
      arrNum = 1;
    } else {
      alert = <div></div>;
    }
    return (
      <div className="App">
        <Header />
        <InputForm value={this.state.chosenDie} onChange={this.handleChange} onClick={this.handleSubmit} />
        {alert}
        <DieArea num={arrNum} onChange={this.handleChange}/>
      </div>
    );
  }
}

export default App;
