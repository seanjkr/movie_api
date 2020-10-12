import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainViewCSS from './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            movies : null,
            selectedMovie : null,
            user : null,
            signUp : false
        };
    }
      
    componentDidMount() {
        axios.get('https://seans-movie-api.herokuapp.com/movies').then(response => {
            this.setState({
              movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onMovieClick( movie ) {
        this.setState( { 
            selectedMovie : movie
        });
    }

    onLoggedIn( user ) {
        this.setState( {
            user : user
        });
    }

    registerNewUser( newUser ) {
        this.setState( {
            signUp : newUser
        });
    }

    render() {
        const { movies , selectedMovie , user , signUp } = this.state;

        if ( !user && signUp === false ) return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />;

        if( signUp === true ) return <RegistrationView/>;
    
        if ( !movies ) return <div className="main-view"/>;
    
        return (
            <Container fluid className = "main-view">
                <Row className = "justify-content-center">
                        {selectedMovie
                            ? <MovieView movie = { selectedMovie } back = { movie => this.onMovieClick( !movie )} />
                            : movies.map( movie => (
                                <Col sm = {6} lg = {4}  xl = {3} className = "movie-card-col">
                                    <MovieCard key = { movie._id } movie = { movie } onClick = { movie => this.onMovieClick( movie )} />
                                </Col> 
                            ))
                        }
                </Row>
            </Container>    
        );
    }
}