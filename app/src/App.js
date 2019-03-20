import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import List from './List'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://127.0.0.1:3001/api')
    .then(res => res.json())
    .then(data => {
      this.setState({ data })
    })
  }

  render() {
    return (
      <List data={ this.state.data } />
    );
  }
}

export default App;
