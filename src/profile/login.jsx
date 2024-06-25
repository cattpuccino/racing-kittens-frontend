// Código extraído de cápsulas.

import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import LogoutButton from './logout';
import '../styles/Rooms.css';
import API_URL from '../config';



function Login() {
  const { token, setToken} = useContext(AuthContext);
  const { userName, setUserName} = useContext(AuthContext);
  const { setIsUser} =  useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios.post(`${API_URL}/login`, {
        email: email,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setIsUser(true);
        alert("Login exitoso!");
        // Recibimos el token y lo procesamos

        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        console.log("Se seteo el token: ", token);

        const username = response.data.userName;
        localStorage.setItem('userName', username);
        setUserName(username);
        console.log("Se seteo el nombre de usuario: ", userName);


      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
        //setToken(null)
      })

  };


  return (
    <div className="form">
      <h1>Iniciar Sesión</h1>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con el Login, por favor trata nuevamente.</div>}
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Enviar" />
      </form>

      {<div className='links'><a href='/signup'>No tienes cuenta? Presiona aquí para crear una.</a></div>}
    </div>
  );
}

export default Login;