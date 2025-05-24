import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Movies extends Component {
  state = {
    movies: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch('http://localhost:4000/moviesxx')
      // .then(res => res.json())
      .then(res => {
        console.log('Status Code:', res.status);
        if (!res.ok) {
          let err = Error;
          err.message = `Error: ${res.status} ${res.statusText}`;
          this.setState({
            isLoaded: true,
            error: err,
          });
        }
        return res.json();
      })
      .then(json => {
        this.setState(
          {
            movies: json.movies,
            isLoaded: true,
          },
          error => {
            this.setState({
              isLoaded: true,
              error: error,
            });
          }
        );
      })
      .catch(err => console.log(err));
  }

  render() {
    const { movies, isLoaded, error } = this.state;
    if (error) {
      return (
        <Fragment>
          <h2>{error.message}</h2>
        </Fragment>
      );
    } else if (!isLoaded) {
      return (
        <Fragment>
          {JSON.stringify(movies)}
          <h2>Loading...</h2>
        </Fragment>
      );
    } else if (movies.length === 0) {
      return <h2>No movies found</h2>;
    } else
      return (
        <Fragment>
          <h2>Choose a movies</h2>
          <ul>
            {movies.map(m => (
              <li key={m.id}>
                <Link to={`/movies/${m.id}`}>{m.title}</Link>
              </li>
            ))}
          </ul>
        </Fragment>
      );
  }
}
