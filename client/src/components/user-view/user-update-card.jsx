import React, { useState } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';


export function UpdateInfoView( props ) {
  const [ newEmail , setNewEmail ] = useState( '' );
  const [ newUsername , setNewUsername ] = useState( '' );
  const [ newPassword , setNewPassword ] = useState( '' );
  const [ newBirthday , setNewBirthday ] = useState( '' );

  const updateInfo = (e) => {
    e.preventDefault();
    const Token = localStorage.getItem( 'token' );
    const Name = localStorage.getItem( 'user' );

    axios({ method : 'put' , url : `https://seans-movie-api.herokuapp.com/users/${Name}` ,
      headers : { Authorization : `Bearer ${Token}`} , 
      data : {
        "Username" : newUsername,
        "Email" : newEmail,
        "Password" : newPassword,
        "Birthday" : newBirthday
      }
    })
    .then( response => {
      const data = response.data;
      console.log( data );
      window.open( '/users' , '_self' );
    })
    .catch( e => {
      console.log( 'error updating user')
    });
  };

  return (
    <Accordion>

      <Card className = "bg-light user-card" >

        <Card.Header>
          <Accordion.Toggle as = { Button } variant = "link" eventKey = "0">
            Update Info
          </Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey = "0">

          <Card.Body>

            <Form>

              <Form.Group controlId = "formBasicEmail">
                <Form.Label> Email Address </Form.Label>
                <Form.Control type = "email" placeholder = "New email" value = { newEmail } onChange = { e => setNewEmail( e.target.value )} />
              </Form.Group>

              <Form.Group controlId = "formBasicUsername">
                <Form.Label> Username </Form.Label>
                <Form.Control type = "text" placeholder = "New Username" value = { newUsername } onChange = { e => setNewUsername( e.target.value )} />
              </Form.Group>

              <Form.Group> 
                <Form.Label> Password </Form.Label>
                <Form.Control type = "password" placeholder = "New Password" value = { newPassword } onChange = { e => setNewPassword( e.target.value )} />
              </Form.Group>

              <Form.Group> 
                <Form.Label> Birthday </Form.Label>
                <Form.Control type = "date" value = { newBirthday } onChange = { e => setNewBirthday( e.target.value )} />
              </Form.Group>

              <Button variant = "primary" type = "submit" onClick = { updateInfo }>
                Submit
              </Button>

            </Form>
          
          </Card.Body>

        </Accordion.Collapse>
          
      </Card>
        
    </Accordion>

  );
}