import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {clickButton} from './actions';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "Danilo", footer: "FIAP", date: "26/06/2019" };
    this.updateHeader = this.updateHeader.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateHeader() {
    this.setState({ name: "FIAP" })
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  async componentDidMount(){
    await fetch("https://5d04064fd1471e00149bb174.mockapi.io/api/v1/blogs/1")
      .then(response => response.json())
      .then(data => this.setState({name: data.title}))
  }

  state = {
    inputValue: ''
  }
  inputChange = event => {
    this.setState({
      inputValue: event.target.value
    })
  }
  render() {
    const {newValue, clickButton} = this.props;
    const {inputValue} = this.state;
    return (
      <>
        <div className="App" style={{ paddingTop: '10px' }}>
          <input type='text' value={inputValue} onChange={this.inputChange} />
          <button onClick={() => clickButton(inputValue)}>
            Click me!
          </button>
          <h1>{newValue}</h1>
          <h2>{inputValue}</h2>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  newValue: store.clickState.newValue
})

const mapDispatchToProps = dispatch => bindActionCreators({clickButton}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);