import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../styles/Rooms.css';
import '../styles/Modal.css';
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

function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [roomname, setRoomname] = useState("");
    const [password, setPassword] = useState("");
    const [roomId, setSelectedRoomId] = useState("");
    const { token } = useContext(AuthContext)
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const decodedToken = parseJwt(token);
    const userId = decodedToken.sub;

    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios({
          method: 'get',
          url: `${API_URL}/rooms/show`,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then((response) => {
            // Filter rooms that are not full
            let availableRooms = response.data.filter(room => room.full === false);
            // filer rooms that are not created by the user
            availableRooms = availableRooms.filter(room => parseInt(room.userid, 10) !== parseInt(userId, 10));
            //console.log(availableRooms);
            setRooms(availableRooms);
          })
          .catch((error) => console.error(error));
        
    }, [])

    const handleJoinClick = (roomId, roomName) => {
      setRoomname(roomName);
      setSelectedRoomId(roomId);
      setModal(true);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      axios.patch(`${API_URL}/rooms/${userId}/join/${roomId}`, {
          name: roomname,
          password: password,
      }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      }).then((response) => {
          console.log('Unión existosa!');
          setError(false);
          setMsg('Unión existosa!');
          setModal(false);
          navigate(`/rooms/waiting-room/${roomId}`);
      }).catch((error) => {      
          console.error('Ocurrió un error:', error);
          setError(true); 
          setModal(false);
      });
  }

  const handleCloseModal = () => {
    setModal(false);
    setPassword("");
  }
  
    return (
        <div className='rooms'>
        <h1>Unirse a una sala</h1>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}

        {error && <div className="error">Hubo un error con la unión a la sala de juego escogida.</div>}
            <div className='container-rooms'>
                {rooms.map(room => (
                    <div className='sala' key={room.id}>
                        <p>{room.name}</p>
                        <button onClick={(event) => handleJoinClick(room.id, room.name)} className='button-room'>Unirse</button>
                    </div>
                ))}
            </div>

            {modal && (
                <div className="modal">
                    <div 
                        onClick={handleCloseModal}
                        className="overlay"
                    ></div>
                    <div className="store-content">
                        <h2>Ingrese contrsaeña de la sala</h2>
                        <form className="form" onSubmit={handleSubmit}>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Contraseña..."
                                value={password} 
                                onChange={(event) => setPassword(event.target.value)} 
                            />
                            <div className='button-area'>
                                <button type="submit" className='button'>Unirse</button>
                                <button type='button' className='button' onClick={handleCloseModal}>Cancelar</button>
                            </div>
                        </form>
                    </div> 
                </div>
            )}
        </div>

    );
  }
  
  export default Rooms;
