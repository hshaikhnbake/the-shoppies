import React, { Component } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll'

class MovieList extends Component {

  handleNominate = (movie) => {
    this.props.nominateFilm(movie);
    console.log(movie)
    
  }

  handleDrag = () => {

  }
  
  render() {
    return (
      <div className="movies-list-container">

        <ScrollContainer hideScrollbars="false" className="movies-list scroll-container">
            {this.props.movies.map((movie, i) => {
              return (
                <div className="movies">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <img src={movie.Poster} alt="movie"></img>
                  <button disabled={movie.nominated && this.props.type === "movies" ? true : false}
                  onClick={() => this.handleNominate(movie)}>
                    {this.props.type ==="movies" ? "Nominate" : "Remove Nomination"}
                    </button>
                </div>
              );
            })}
        </ScrollContainer>
      </div>
    );
  }
}

export default MovieList;