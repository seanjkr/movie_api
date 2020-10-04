import e from 'express';
import React, { useState } from 'react';

export function LoginView( props ) {
  const [ email , setEmail ] = useState( '' );
  const [ username , setUsername ] = useState( '' );
  const [ password , setPassword ] = useState( '' );
  const [ birthday , setBirthday ] = useState( '' );

  const handleSubmit = () => {
    e.preventDefault();
    console.log( username , password , email , birthday );
    props.onLoggedIn( username )
  };

  return (
    <div>
      <form>
        <label>
          Email:
          <input type = "type" value = { username } onChange = { e => setEmail( e.target.value )} />
        </label>

        <label>
          Username:
          <input type = "text" value = { username } onChange = { e => setUsername( e.target.value )} />
        </label>

        <label> 
          Password:
          <input type = "password" value = { password } onChange = { e => setPassword( e.target.value )} />
        </label>

        <label>
          Re-Enter Password:
          <input type = "password" value = { password } onChange = { e => setPassword( e.target.value )} />
        </label>

        <label> 
          Birthday:
          <input type = "date" value = { birthday } onChange = { e => setBirthday( e.target.value )} />
        </label>

        <button type = "button" onClick = { handleSubmit }> Submit </button>
      </form>

      <button type = "button" onClick = { goToLogin }> Login </button>

    </div>
  );
}