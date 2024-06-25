import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import axios from 'axios';
import '../styles/form.css';
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../config';


// Función extraída de chatGPT, permite decodificar el JWT de manera manual ya que no funcionó el 
// uso de la librería jwt-decode.
function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  }

function Create() {
  const [roomname, setRoomname] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useContext(AuthContext)
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const decodedToken = parseJwt(token);
    const userId = decodedToken.sub;

    axios.post(`${API_URL}/rooms/create`, {
        name: roomname,
        password: password,
        userid: userId
      }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        const roomId = response.data.id;
        console.log('Creación existosa!');
        setError(false);
        setMsg('Creación existosa!');
        navigate(`/rooms/waiting-room/${roomId}`);
      }).catch((error) => {      
      console.error('Ocurrió un error:', error);
      setError(true); 
      });
    }

  return (
    <div className="form">
      <h1>Crear Sala</h1>
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">Hubo un error con la creación, por favor trata nuevamente.</div>}

      <form onSubmit={handleSubmit}>
            <input 
            type="text"
            id="room-name" 
            name="room-name" 
            value={roomname}
            placeholder='Nombre sala...' 
            onChange={e => setRoomname(e.target.value)}
            required
            />
        
            <input
            type="password"
            id="room-password"
            name="room-password"
            value={password}
            placeholder='Contraseña...'
            onChange={e => setPassword(e.target.value)}
            required
            />
        <input className="button" type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default Create;
