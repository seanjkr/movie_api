import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class MyMovieApp extends React.Component {
  render() {
    return (
      <div className="movie-app">
        <div>Good Morning</div>
      </div>
    );
  }
}

const container = document.getElementByClassName( 'app-container' )[0];

ReactDOM.render( React.createElement( MyMovieApp ), container );
