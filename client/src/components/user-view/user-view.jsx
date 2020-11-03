import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
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
      newUsername : '',
      newEmail : '',
      newPassword : '',
      newBirthday : null,
    };

    this.changeEmail = this.changeEmail.bind( this );
    this.changeUsername = this.changeUsername.bind( this );
    this.changePassword = this.changePassword.bind( this );
    this.changeBirthday = this.changeBirthday.bind( this );

    this.updateInfo = this.updateInfo.bind( this );
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
      this.setState({
        user : null
      })
      localStorage.clear();
      window.open( '/' , '_self' );
    })
    .catch( function( err ) {
      console.log( err );
    });
  }

  removeFavoriteMovie( movie ) {
    const Username = localStorage.getItem( 'user' );
    const Token = localStorage.getItem( 'token' );

    axios.delete( `https://seans-movie-api.herokuapp.com/users/${Username}/movies/${movie._id}` , {
      headers : { Authorization : `Bearer ${Token}`}
    })
    .then(( res ) => {
      window.open( '/users' , '_self' );
    })
    .catch( function( err ) {
      console.log( err );
    })
  }

  changeEmail( e ) {
    this.setState({
      newEmail : e.target.value
    });
  }

  changeUsername( e ) {
    this.setState({
      newUsername : e.target.value
    });
  }
  
  changePassword( e ) {
    this.setState({
      newPassword : e.target.value
    });
  }

  changeBirthday( e ) {
    this.setState({
      newBirthday : e.target.value
    });
  }
  
  updateInfo( e ) {
    e.preventDefault();
    const Token = localStorage.getItem( 'token' );
    const Username = localStorage.getItem( 'user' );
    axios.put( `https://seans-movie-api.herokuapp.com/users/${Username}` , {
      headers : { Authorization : `Bearer ${Token}`} , 
      Username : this.state.newUsername,
      Email : this.state.newEmail,
      Password : this.state.newPassword,
      Birthday : this.state.newBirthday
    })
    .then( response => {
      const data = response.data;
      console.log( data );
      window.open( '/users' , '_self' );
    })
    .catch( e => {
      console.log( 'error updating info')
    });
  };


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

                <ListGroup>

                  { FavoriteList.map( ( movie ) => (
                    <ListGroup.Item action href = { `/movies/${movie._id}` } variant = "dark" className = "favorite-movie_card" >

                      <h3> { movie.Title } </h3>

                      <Button variant = "link" size = "sm" className = "remove-favorite" className = "justify-content-end" onClick = { () => removeFavoriteMovie( movie ) } >
                        Remove
                      </Button>
                  
                    </ListGroup.Item>
                  
                  ))}
                  
                </ListGroup>

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
                        <Form.Control type = "email" placeholder = "New email" onChange = { this.changeEmail } />
                      </Form.Group>

                      <Form.Group controlId = "formBasicUsername">
                        <Form.Label> Username </Form.Label>
                        <Form.Control type = "text" placeholder = "New Username" onChange = { this.changeUsername }/>
                      </Form.Group>

                      <Form.Group> 
                        <Form.Label> Password </Form.Label>
                        <Form.Control type = "password" placeholder = "New Password" onChange = { this.changePassword }/>
                      </Form.Group>

                      <Form.Group> 
                        <Form.Label> Birthday </Form.Label>
                        <Form.Control type = "date" name = "newBirthday" onChange = { this.changeBirthday }/>
                      </Form.Group>

                      <Button variant = "secondary" type = "submit" onClick = { this.updateInfo } >
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