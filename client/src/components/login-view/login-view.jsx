import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView( props ) {
  const [ username , setUsername ] = useState( '' );
  const [ password , setPassword ] = useState( '' );
  const newUser = 'New User';

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://seans-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch( e => {
      console.log('user not found - try again')
    });
  };

  return (

    <Container fluid>

      <Row className = "justify-content-center">

        <Col sm = {9} md = {6} lg = {5}>

          <Card className = "bg-light">

            <Card.Body>

              <Form>

                <Form.Group controlId = "formBasicUsername">
                  <Form.Label> Username </Form.Label>
                  <Form.Control type = "text" value = { username } onChange = { e => setUsername( e.target.value )} placeholder = "Username" />
                </Form.Group>

                <Form.Group controlId = "formBasicPassword">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type = "password" value = { password } onChange = { e => setPassword( e.target.value )} placeholder = "Password" />
                </Form.Group>

                <Form.Group controlId = "formBasicCheckbox">
                  <Form.Check type = "checkbox" label = "Keep me logged in" />
                </Form.Group>

                <Button variant = "primary" type = "submit" onClick = { handleSubmit }>
                  Submit
                </Button>

              </Form>

              <a className = "passwordReset" href = "#"> Forgot Password? </a>

              <a className = "register-new" href = "/register"> Register? </a>

            </Card.Body>

          </Card>

        </Col>
      
      </Row>

    </Container>
  );
}