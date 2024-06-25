// Código extraído de cápsulas.

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Rooms.css';
import API_URL from '../config';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${API_URL}/signup`, {
        username: username,
        email: email,
        password: password
      }).then((response) => {
        console.log('Registro exitoso! Ahora puedes volver y loguearte');
        setError(false);
        setMsg('Registro exitoso! Ahora puedes volver y loguearte');
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); 
      });
    }

  return (
    <div className="form">
      <h1>Registrarse</h1>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Registro, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="username"
            value={username}
            placeholder='Nombre de usuario...'
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input 
            type="email" 
            name="email"
            value={email}
            placeholder='Email...'
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            name="password"
            value={password}
            placeholder='Contraseña...'
            onChange={e => setPassword(e.target.value)}
            required
          />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default Signup;