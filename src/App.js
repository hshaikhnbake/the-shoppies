import React, { Component } from 'react';
import SearchBar from './components/SearchBar.js';
import Header from './components/Header.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SearchBar />
      </div>
    );
  }
}

export default App;
