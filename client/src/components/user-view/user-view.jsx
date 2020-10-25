import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import './user-view.scss';

export class UserView extends React.Component {
  constructor( props ) {
    super( props );
  

    this.state = {
      Username : null,
      Email : null,
      Birthday : null,
      FavoriteMovies : [],
      movies :[],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem( 'token' );
    this.getUser( token );
  }

  getUser( token ) {
    const Username = localStorage.getItem( 'user' );

    axios.get( `https://seans-movie-api.herokuapp.com/users/${Username}` , {
      headers : { Authorization : `Bearer ${token}` }
    })
      .then(( res ) => {
        this.setState( { 
          Username : res.data.Username,
          Email : res.data.Email,
          Birthday : res.data.Birthday,
          FavoriteMovies : res.data.FavoriteMovies,
        });
      })
    .catch( function( err ) {
      console.log( err );
    });
  }

  deleteAccount( token ) {
    const Username = localStorage.getItem( 'user' );

    axios.delete( `https://seans-movie-api.herokuapp.com/users/${Username}` , {
      headers : { Authorization : `Bearer ${token}`}
    })
    .then(( res ) => {
      this.setState( {
        user : null
      })
    })
    .catch( function( err ) {
      console.log( err );
    });
  }


  render() {
    const { movies } = this.props;

    const FavoriteList = movies.filter( ( movie ) =>
      this.state.FavoriteMovies.includes( movie._id )
    )

    return (

      <Container fluid>

        <Row className = "justify-content-center">

          <Col lg = {10} xl = {9}>

            <h2> Your info! </h2>

            <Card className = "bg-light user-card">

              <Card.Body>
                
                <Card.Text> <span className = "label"> Username : </span> { this.state.Username } </Card.Text>
                <Card.Text> <span className = "label"> Email : </span> { this.state.Email } </Card.Text>
                <Card.Text> <span className = "label"> Birthday : </span> { this.state.Birthday } </Card.Text>

                <Card.Text className = "label"> Favorite Movies : </Card.Text>

                <Card.Text>

                  { FavoriteList.map( ( movie ) => (
                    <div className = "favorites-list_item">

                      <Link to = { `/movies/${movie._id}` } > { movie.Title } </Link>

                      <Button className = "remove-favorite" onClick = { () => this.removeFavoriteMovie( movie._id ) } >
                        Remove from Favorites
                      </Button>
                  
                    </div>
                  
                  ))}
                  
                </Card.Text>

              </Card.Body>

            </Card>

            <Accordion>

              <Card className = "bg-light user-card" >

                <Card.Header>
                  <Accordion.Toggle as = { Button } variant = "link" eventKey = "0">
                    Update Info
                  </Accordion.Toggle>
                </Card.Header>

                <Accordion.Collapse eventKey = "0">

                  <Card.Body> 

                    <Form>

                      <Form.Group controlId = "formBasicEmail">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control type = "email" placeholder = "Enter email" />
                      </Form.Group>

                      <Form.Group controlId = "formBasicUsername">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type = "text" placeholder = "Choose Username" />
                      </Form.Group>

                      <Form.Group> 
                        <Form.Label> Password </Form.Label>
                        <Form.Control type = "password" placeholder = "Password" />
                      </Form.Group>

                      <Form.Group> 
                        <Form.Label> Birthday </Form.Label>
                        <Form.Control type = "date" />
                      </Form.Group>

                      <Button variant = "primary" type = "submit">
                        Submit
                      </Button>

                    </Form>
  
                  </Card.Body>

                </Accordion.Collapse>

              </Card>
            
            </Accordion>

            <Button onClick = { () => this.deleteAccount( localStorage.getItem( 'token' ) )} > Delete Profile </Button>

            <Link to = "/"> 
              <Button variant = "link"> Back </Button> 
            </Link>

            </Col>
          
          </Row>

      </Container>
    );
  }
} 