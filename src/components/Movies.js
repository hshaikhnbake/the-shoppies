import React, { Component } from 'react';
import axios from 'axios'
import MovieList from './MovieList.js'

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      nominatedFilms: [],
    }
  }

  componentDidMount() {
    this.useEffect()
    this.props.onRef(this);
  }

  getMovie(value) {
    axios({
      url: 'http://www.omdbapi.com/',
      params: {
        apikey: '4a9419c3',
        type: 'movie',
        s: value,
      },
    }).then((response) => {
      const movies = []
      for (const key in response.data.Search) {
        movies.push(response.data.Search[key])
      }
      
      const nominatedFilms = this.state.nominatedFilms
  
      const clicked = nominatedFilms.map((item) => {
        return item.imdbID
      })
  
      const check = movies.map((item) => {
        return item.imdbID
      })
  
      const filteredArray = clicked.filter(value => check.includes(value));
  
      filteredArray.forEach(id => {
        const setNominated = movies.find(movies => movies.imdbID === id);
        setNominated.nominated = true
        });

      this.setState({
        movies,
      })
      
  })
  }


  useEffect = () => {

    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    this.setState({
      nominatedFilms: movieFavourites || [],
    }) 
  };

  saveToLocalStorage = (items) => {

    let a = []
    a = JSON.parse(localStorage.getItem('react-movie-app-favourites')) || [];
    
    a.push(items);
    
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(a));
  
  }

  removeLocalStorage = (items) => {
    
    let b = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    
    const filter = b.map((item) => {
      return item.imdbID;
    }).indexOf(items.imdbID)

    b.splice(filter, 1)
    
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(b));

  }

  addNomination = (movie) => {
    
    if (this.state.nominatedFilms.length <= 4 
      ) {
      movie.nominated = true
      
      this.setState({
          nominatedFilms: [...this.state.nominatedFilms, movie], 
        });

      this.saveToLocalStorage(movie)
    } 

  }
  
  removeNomination = (nominatedMovie) => {
    
    this.setState({
      
      movies: this.state.movies.map((movie) => {
        if (movie.imdbID === nominatedMovie.imdbID) {
          movie.nominated = false
        }
        return movie
      }),
      
      nominatedFilms: this.state.nominatedFilms.filter((movie) => {
          return movie.imdbID !== nominatedMovie.imdbID
      }),
    })

    this.removeLocalStorage(nominatedMovie)
  }
  
  render() {
    return (
      <>
        <h2>Movies</h2>
        <MovieList 
        type={"movies"}
        movies={this.state.movies}
        nominateFilm={this.addNomination}
        disable={this.state.nominatedFilms}
        />
        <h2>Nominated {this.state.nominatedFilms.length}/5</h2>
        <MovieList
          type={"nominated"}
          movies={this.state.nominatedFilms}
          nominateFilm={this.removeNomination}
        />
      </>
    );
  }
}

export default Movies;