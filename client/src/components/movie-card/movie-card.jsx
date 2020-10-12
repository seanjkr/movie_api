import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <Card style = {{ width : '19rem' }} className = "bg-light">
                <Card.Img variant = "top" src = { movie.ImagePath } />
                <Card.Body>
                    <Card.Title> { movie.Title } </Card.Title>
                    <Card.Text className = "description-text"> { movie.Description } </Card.Text>
                    <Button onClick = { () => onClick( movie )} variant = "link"> See more! </Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = { 
    movie : PropTypes.shape( {
        Title : PropTypes.string
    }).isRequired,
    onClick : PropTypes.func.isRequired
};