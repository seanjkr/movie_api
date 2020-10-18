import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import DirectorViewCSS from './director-view.scss';
import { Link } from 'react-router-dom';


export class DirectorView extends React.Component {
   constructor() {
      super();

      this.state = {};
   }

   render() {
      const { director } = this.props;

      if ( !director ) return null;

      return (

         <Col md ={10} className = "director-info">

          <Card className = "text-center director-view-card bg-light"> 

            <Card.Header>
              <span className = "director-name"> <h2> { director.Name } </h2> </span>
            </Card.Header>

            <Card.Body>

              <Card.Text className = "director-bio">
                <span className = "label"> Biography: </span>
                <span className = "value"> { director.Bio } </span>
              </Card.Text>

              <Card.Text className = "director-birth">
                <span className = "label"> Born: </span>
                <span className = "value"> { director.Birth } </span>
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