import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import MovieViewCSS from './movie-view.scss';


export class MovieView extends React.Component {
   constructor() {
      super();

      this.state = {};
   }

   render() {
      const { movie , back } = this.props;

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
                     <Button variant = "link"> { movie.Genre.Name } </Button>
                  </Card.Text>

                  <Card.Text className = "movie-director">
                     <span className = "label"> Director: </span>
                     <Button variant = "link"> { movie.Director.Name } </Button>
                  </Card.Text>

                  <Button className = "back-button primary" onClick = { () => back( movie ) } > Back </Button>

               </Card.Body>

            </Card>

         </Col>

      );
   }
}