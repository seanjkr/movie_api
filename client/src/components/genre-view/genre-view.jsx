import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import GenreViewCSS from './genre-view.scss';
import { Link } from 'react-router-dom';


export class GenreView extends React.Component {
   constructor() {
      super();

      this.state = {};
   }

   render() {
      const { genre } = this.props;

      if ( !genre ) return null;

      return (

         <Col md ={9} className = "genre-info">

          <Card className = "text-center genre-card bg-light"> 

            <Card.Header>
              <span className = "genre-name"> <h2> { genre.Name } </h2> </span>
            </Card.Header>

            <Card.Body>

              <Card.Text className = "genre-description">
                  <span className = "label"> Description: </span>
                  <span className = "value"> { genre.Description } </span>
              </Card.Text>

              <Link to = { '/' }>
                <Button className = "back-button primary"> Back </Button>
              </Link>

            </Card.Body>

          </Card>

         </Col>

      );
   }
}