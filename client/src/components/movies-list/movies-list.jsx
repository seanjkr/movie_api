import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Col from 'react-bootstrap/Col';
import './movies-list.scss'

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList( props ) {
  const { movies , visibilityFilter } = props;
  let filteredMovies = movies;

  if ( visibilityFilter !== '') {
    filteredMovies = movies.filter( m => m.Title.includes( visibilityFilter ));
  }

  if( !movies ) return <div className = "main-view" />;

  return <React.Fragment>

      <Col xs = {10} className = "movie-card-col">
        <VisibilityFilterInput visibilityFilter = { visibilityFilter } />
      </Col>
    
      {filteredMovies.map( m =>
        <Col sm = {6} lg = {4}  xl = {3} className = "movie-card-col" >
          <MovieCard key = { m._id } movie = {m} />
        </Col>
      )}

    </React.Fragment>
}

export default connect( mapStateToProps ) ( MoviesList );