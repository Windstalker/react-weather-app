import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import request from './api/request'

class App extends Component {
  componentDidMount() {
    this.fetchWeather()
  }

  async fetchWeather() {
    let result
    try {
      result = await request.get('/weather').query({ q: 'Kharkiv' })
      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
