import React from 'react';
import axios from 'axios';
import { UpdateInfoView } from './user-update-card';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './user-view.scss';

export class UserView extends React.Component {
  constructor( props ) {
    super( props );
  

    this.state = {
      Username : null,
      Email : null,
      Birthday : null,
      FavoriteMovies : [],
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
        this.setState ( { 
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
      window.open( '/client' , '_self' );
    })
    .catch( function( err ) {
      console.log( err );
    });
  }

  removeFavorite( movie ) {
    const Username = localStorage.getItem( 'user' );
    const Token = localStorage.getItem( 'token' );

    axios.delete( `https://seans-movie-api.herokuapp.com/users/${Username}/movies/${movie}` , {
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
    const { movies } = this.props;

    const FavoriteList = movies.filter( ( movie ) =>
      this.state.FavoriteMovies.includes( movie._id )
    )

    return (

      <Container fluid>

        <Row className = "justify-content-center">

          <Col lg = {11} xl = {10}>

            <h2> Your info! </h2>

            <Card className = "bg-light user-card">

              <Card.Body>
                
                <Card.Text> <span className = "label"> Username : </span> { this.state.Username } </Card.Text>
                <Card.Text> <span className = "label"> Email : </span> { this.state.Email } </Card.Text>
                <Card.Text> <span className = "label"> Birthday : </span> { this.state.Birthday } </Card.Text>

              </Card.Body>

            </Card>

            <UpdateInfoView/>

          </Col>

          <Col lg = {11} xl = {10}>

            <Card className = "bg-light user-card">

              <Card.Body>

                <Card.Title> Favorite Movies: </Card.Title>

                <Container>

                  <Row>

                    { FavoriteList.map( ( movie ) => (
                      <Col xs = {6} md = {4}  lg = {3} >

                        <Card style = {{ width : '12rem' }} className = "bg-light">

                          <Card.Img variant = "top" src = { movie.ImagePath } />

                          <Card.Body>

                            <Card.Title> { movie.Title } </Card.Title>

                            <Link to = { `/movies/${movie._id}` } >
                              <Button variant = "link"> See more! </Button>
                            </Link>

                          </Card.Body>

                          <Card.Footer>

                          <Button variant = "secondary" size = "sm" className = "remove-favorite" onClick = { () => this.removeFavorite( movie._id ) } >
                            Remove Favorite
                          </Button>

                          </Card.Footer>

                        </Card>

                      </Col>
                    ))}

                  </Row>

                </Container>

              </Card.Body>

            </Card>
          
          </Col>

          <Col lg = {10} xl = {9} >

            <Button variant = "link" onClick = { () => this.deleteAccount( localStorage.getItem( 'token' ) )} > Delete Profile </Button>

          </Col>
          
        </Row>

      </Container>
    );
  }
} 