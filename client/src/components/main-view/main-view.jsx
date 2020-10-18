import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainViewCSS from './main-view.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';


export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            movies : null,
            selectedMovie : null,
            user : null,
        };
    }
      
    componentDidMount() {
        let accessToken = localStorage.getItem( 'token' );
        if (accessToken !==null) {
            this.setState({
                user : localStorage.getItem('user')
            });
            this.getMovies();
        }
    }

    getMovies() {
        axios.get('https://seans-movie-api.herokuapp.com/movies').then(response => {
            this.setState({
              movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedIn( authData ) {
        console.log( authData );
        this.setState( {
            user : authData.user.Username
        });

        localStorage.setItem( 'token' , authData.token );
        localStorage.setItem( 'user' , authData.user.Username );
    }

    render() {
        const { movies , selectedMovie , user } = this.state;

        if ( !user ) return ( 
            <Router>

                <Route exact path = "/" render = { () => {
                    return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                }}/>

                <Route exact path = "/login" render = { () => {
                    return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                }}/>

                <Route exact path = "/register" render = { () => {
                    return <RegistrationView/>
                }}/>

            </Router> );
    
        if ( !movies ) return <div className="main-view"/>;

        return (
            <Router>

                <Container fluid className = "main-view">

                    <Row className = "justify-content-center">

                        <Route exact path = "/" render = { () => movies.map( m => 
                            <Col sm = {6} lg = {4}  xl = {3} className = "movie-card-col">
                                <MovieCard key = { m._id } movie = {m} />
                            </Col>
                        )}/>

                        <Route exact path = "/movies/:movieId" render = {({ match }) => 
                            <MovieView movie = { movies.find( m => m._id === match.params.movieId )}/>
                        }/>

                        <Route exact path = "/genres/:name" render = { ( { match } ) => {
                            if (!movies ) return <div className = "main-view"/>;
                            return <GenreView genre = { movies.find( m => m.Genre.Name === match.params.name).Genre }/> }
                        }/>

                        <Route exact path = "/directors/:name" render = { ( { match }) =>{
                            if (!movies ) return <div className = "main-view"/>;
                            return <DirectorView director = { movies.find( m => m.Director.Name === match.params.name).Director }/> } 
                        }/>

                    </Row>

                </Container> 

            </Router>
        );
    }
}