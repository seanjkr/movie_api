import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card style = {{ width : '19rem' }} className = "bg-light">

                <Card.Img variant = "top" src = { movie.ImagePath } />

                <Card.Body>

                    <Card.Title> { movie.Title } </Card.Title>

                    <Card.Text className = "description-text"> { movie.Description } </Card.Text>

                    <Link to = { `/movies/${movie._id}` } >
                        <Button variant = "link"> See more! </Button>
                    </Link>

                </Card.Body>

            </Card>
        );
    }
}

MovieCard.propTypes = { 
    movie : PropTypes.shape( {
        Title : PropTypes.string
    }).isRequired
};