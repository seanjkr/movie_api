import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';


export function RegistrationView( props ) {
  const [ email , setEmail ] = useState( '' );
  const [ username , setUsername ] = useState( '' );
  const [ password , setPassword ] = useState( '' );
  const [ birthday , setBirthday ] = useState( '' );

  const signedUp = (e) => {
    e.preventDefault();

    axios.post( 'https://seans-movie-api.herokuapp.com/register' , {
      Username : username,
      Password : password,
      Email : email,
      Birthday : birthday
    })
    .then( response => {
      const data = response.data;
      console.log( data );
      window.open( '/' , '_self' );
    })
    .catch( e => {
      console.log( 'error registering user')
    });
  };

  return (
    <Container fluid>

      <Row className = "justify-content-center">

        <Col sm = {9} md = {6} lg = {5}>

          <Card className = "bg-light">

            <Card.Body>

              <Form>

                <Form.Group controlId = "formBasicEmail">
                  <Form.Label> Email Address </Form.Label>
                  <Form.Control type = "email" placeholder = "Enter email" value = { email } onChange = { e => setEmail( e.target.value )} />
                </Form.Group>

                <Form.Group controlId = "formBasicUsername">
                  <Form.Label> Username </Form.Label>
                  <Form.Control type = "text" placeholder = "Choose Username" value = { username } onChange = { e => setUsername( e.target.value )} />
                </Form.Group>

                <Form.Group> 
                  <Form.Label> Password </Form.Label>
                  <Form.Control type = "password" placeholder = "Password" value = { password } onChange = { e => setPassword( e.target.value )} />
                </Form.Group>

                <Form.Group> 
                  <Form.Label> Birthday </Form.Label>
                  <Form.Control type = "date" value = { birthday } onChange = { e => setBirthday( e.target.value )} />
                </Form.Group>

                <Button variant = "primary" type = "submit" onClick = { signedUp }>
                  Submit
                </Button>

              </Form>

              <a href ="/login"> Sign in! </a>

            </Card.Body>
          
          </Card>
        
        </Col>
      
      </Row>

    </Container>
  );
}
