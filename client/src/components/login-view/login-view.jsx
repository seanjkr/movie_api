import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView( props ) {
  const [ username , setUsername ] = useState( '' );
  const [ password , setPassword ] = useState( '' );
  const newUser = 'New User';

  const handleSubmit = () => {
    console.log( username , password );
    props.onLoggedIn( username )
  };

  const registerUser = () => {
    console.log( newUser );
    props.registerNewUser( newUser );
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

                <a className = "passwordReset" href = "#"> Forgot Password? </a>

              </Form>

            </Card.Body>

          </Card>

        </Col>
      
      </Row>

    </Container>
  );
}