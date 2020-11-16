import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies , setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { UserView } from '../user-view/user-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import './main-view.scss';


export class MainView extends React.Component {
    constructor() {
        super();
    }
      
    componentDidMount() {
        let accessToken = localStorage.getItem( 'token' );
        if (accessToken !== null ) {
            this.props.setUser( localStorage.getItem('user') );
            this.getMovies();
        }
    }

    getMovies() {
        axios.get('https://seans-movie-api.herokuapp.com/movies').then(response => {
            this.props.setMovies( response.data );
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onLoggedIn( authData ) {
        console.log( authData );
        this.props.setUser( authData.user.Username );
        localStorage.setItem( 'token' , authData.token );
        localStorage.setItem( 'user' , authData.user.Username );
        this.getMovies( authData.token );
        window.open( '/client' , '_self' );
    }

    render() {
        let { movies } = this.props;
        let { user } = this.props;

        if ( user === null ) return ( 
            <Router basename = "/client" >

                <Container fluid className = "everything">

                    <Navbar variant = "dark" fixed = "top" className = " bg-dark navbar">

                        <Navbar.Brand href="/client"> My Movies! </Navbar.Brand>

                        <Navbar.Collapse className = "justify-content-end">

                            <Navbar.Text className = "navbar-text">
                                <a href = "/client/login"> Login </a>
                                / 
                                <a href = "/client/register"> Register </a>
                            </Navbar.Text>

                        </Navbar.Collapse>

                    </Navbar>

                    <div className = "main-view">

                        <Route exact path = "/" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>

                        <Route exact path = "/login" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>

                        <Route exact path = "/register" render = { () => {
                            return <RegistrationView/>
                        }}/>

                        <Route path = "/movies" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>

                        <Route path = "/genres" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>

                        <Route path = "/directors" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>

                        <Route path = "/users" render = { () => {
                            return <LoginView onLoggedIn = { user => this.onLoggedIn( user )} />
                        }}/>


                    </div>
                
                </Container>

            </Router> 
        );
    
        return (
            <Router basename = "/client" >

                <Container fluid className = "everything">

                    <Navbar variant = "dark" fixed = "top" className = "bg-dark navbar">

                        <Navbar.Brand href="/"> My Movies! </Navbar.Brand>

                        <Navbar.Collapse className = "justify-content-end">

                            <Dropdown alignRight>

                                <Dropdown.Toggle className = "bg-dark nav-dropdown">
                                    Account
                                </Dropdown.Toggle>

                                <Dropdown.Menu>

                                    <Dropdown.Item href = "/users"> 
                                        Profile
                                    </Dropdown.Item>

                                    <Dropdown.Divider />

                                    <Dropdown.Item href = "/" >
                                        <div onClick = { () => localStorage.clear() } > Logout </div>
                                    </Dropdown.Item>

                                </Dropdown.Menu>

                            </Dropdown>

                        </Navbar.Collapse>

                    </Navbar>

                    <Row className = "justify-content-center main-view">

                        <Route exact path = "/" render = { () => { 
                            return <MoviesList movies = { movies } />;
                        }}/>

                        <Route exact path = "/movies/:movieId" render = { ( { match } ) => {
                            return <MovieView movie = { movies.find( m => m._id === match.params.movieId ) }/> }
                        }/>

                        <Route exact path = "/genres/:name" render = { ( { match } ) => {
                            if (!movies ) return <div className = "main-view"/>;
                            return <GenreView genre = { movies.find( m => m.Genre.Name === match.params.name).Genre }/> }
                        }/>

                        <Route exact path = "/directors/:name" render = { ( { match }) => {
                            if (!movies ) return <div className = "main-view"/>;
                            return <DirectorView director = { movies.find( m => m.Director.Name === match.params.name).Director }/> } 
                        }/>

                        <Route exact path = "/users" render = { () => {
                            return <UserView movies = { movies } /> }
                        }/>

                    </Row>

                </Container> 

            </Router>
        );
    }
}

let mapStateToProps = state => {
    return { 
        movies : state.movies,
        user : state.user
    }    
}

let mapDispatchToProps = {
    setMovies,
    setUser
}

export default connect( mapStateToProps , mapDispatchToProps , null , { setMovies , setUser })( MainView );