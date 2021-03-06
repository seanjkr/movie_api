import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';


export class MovieView extends React.Component {
   constructor() {
      super();

      this.state = {};
   }

   addFavorite( movie ) {
      const Username = localStorage.getItem( 'user' );
      const Token = localStorage.getItem( 'token' );
  
      axios.post( `https://seans-movie-api.herokuapp.com/users/${Username}/movies/${movie}` , {} , {
        headers : { Authorization : `Bearer ${Token}`} 
      })
      .then(( res ) => {
        console.log( res );
        window.open( '/client/users' , '_self' );
      })
      .catch( function( err ) {
        console.log( err );
      });
   }

   render() {
      const { movie } = this.props;

      if ( !movie ) return null;

      return (

         <Col md ={9} className = "movie-info">

            <img className = "movie-poster" src = { movie.ImagePath } />

            <Card className = "text-center movie-view-card bg-light"> 

               <Card.Header>
                  <span className = "movie-title"> <h2> { movie.Title } </h2> </span>
               </Card.Header>

               <Card.Body>

                  <Card.Text className = "movie-description">
                     <span className = "label"> Description: </span>
                     <span className = "value"> { movie.Description } </span>
                  </Card.Text>

                  <Card.Text className = "movie-genre">
                     <span className = "label"> Genre: </span>
                     <Link to = { `/genres/${movie.Genre.Name}`}>
                        <Button variant = "link"> { movie.Genre.Name } </Button>
                     </Link>
                  </Card.Text>

                  <Card.Text className = "movie-director">
                     <span className = "label"> Director: </span>
                     <Link to = {`/directors/${movie.Director.Name}` }>
                        <Button variant = "link"> { movie.Director.Name } </Button>
                     </Link>
                  </Card.Text>

                  <Link to = { '/' }>
                     <Button className = "back-button primary"> Back </Button>
                  </Link>

                  <Button variant = "link" onClick = {() => this.addFavorite( movie._id ) } > 
                     Add to Favorites 
                  </Button>

               </Card.Body>

            </Card>

         </Col>

      );
   }
}