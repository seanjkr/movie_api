import React from 'react';
import ReactDOM from 'react-dom';
import {MainView} from './components/main-view/main-view.jsx';
import './index.scss';

class MyMovieApp extends React.Component {
  render() {
    return <MainView/>;
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyMovieApp), container);