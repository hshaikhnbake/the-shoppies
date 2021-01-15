import React, { Component } from 'react';
import Movies from './Movies.js'

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      search: ''
    }
  }

  handleSearchInput = (e) => {
    const searchInput = e.target.value;
    this.setState({
      searchInput
    })
  }

  handleSearch = () => {
    this.movieList.getMovie(this.state.searchInput);
  }

  render() {
    return (
      <div className="wrapper">
        <h2>Search</h2>
        <label className="search-label" htmlFor="search-input">
          
          <input type="text"
            value={this.state.searchInput}
            name="query"
            id="search-input"
            placeholder="Search movies to nominate"
            onChange={this.handleSearchInput}></input>
          <button className="icons search" onClick={this.handleSearch}>Search</button>
        </label>

        <Movies onRef={ref => (this.movieList = ref)}/>
      </div>
    );
  }
}

export default SearchBar;