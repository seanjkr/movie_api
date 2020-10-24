import React from 'react';
import axios from 'axios';
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
      movies :[],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem( 'token' );
    this.getUser( accessToken );
  }

  getUser( token ) {
    const Username = localStorage.getItem( 'user' );

    axios.get( `https://seans-movie-api.herokuapp.com/users/${Username}` , {
      headers : { Authorization : `Bearer $(token)` }
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

            <Card>

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

                <Card.Text> 
                  <Link to = "/users/update" > Update Information </Link> 
                </Card.Text>

                <Card.Text>
                  <Button onClick = { () => this.deleteAccount()} > Delete Profile </Button>
                </Card.Text>


              </Card.Body>

            </Card>

            <Link to = "/"> 
              <Button variant = "link"> Back </Button> 
            </Link>

          </Col>

        </Row>

      </Container>
    );
  }
} 