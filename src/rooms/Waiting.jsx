import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

import '../styles/Rooms.css'
import cat from '/waiting_cat.png'
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

export default function Waiting() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext)
    const { roomId } = useParams();
    const [hostId, setHostId] = useState("");
    const [isHost, setIsHost] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const decodedToken = parseJwt(token);
    const userId = decodedToken.sub;

    const handleClickOut = () => {
        axios({
            method: 'delete',
            url: `${API_URL}/rooms/close/${roomId}`,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then((response) => {
                navigate('/rooms/show');
            })
            .catch((error) => console.error(error));
    }
    const handleBeginGame = () => {
        axios({
            method: 'post',
            url: `${API_URL}/begin/game`,
            headers: {
              'Authorization': `Bearer ${token}`
            },
            data: {
                'roomid' : roomId
            }
          })
            .then((response) => {
              let gamesession = response.data.gamesession;
              if (gamesession !== undefined){
                navigate('/game?gameid=' + gamesession);
              }
            })
            .catch((error) => console.error(error));
    }
    const handleJoinGame = () => {
        axios({
            method: 'get',
            url: `${API_URL}/begin/game/join/${roomId}`,
            headers: {
              'Authorization': `Bearer ${token}`
            },
          })
            .then((response) => {
              let gamesession = response.data.gamesession;
              if (gamesession !== undefined){
                navigate('/game?gameid=' + gamesession);
              }
            })
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        axios({
            method: 'get',
            url: `${API_URL}/rooms/info/${roomId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then((response) => {
                setHostId(response.data.userId);
                setIsFull(response.data.full)
                const id = parseInt(userId, 10); 
                if(hostId === id){
                setIsHost(true);
                }
                if (isFull && isHost){
                  handleBeginGame()
                }
                if (isFull && !isHost){
                  handleJoinGame()
                }
            })
            .catch((error) => {
                console.error(error)
                if(error.response.status === 404){
                    console.log('Room no encontrada');
                    navigate('/rooms/show');
                }
            });
        
    }, [isHost, hostId, token, userId, roomId, isFull]);
    return (
        <div className='rooms'>
            <div>
                <h1>Esperando a que se unan los jugadores...</h1>
                <span className="loader"></span>
                <img src={cat} alt="cat" className='wait' />
            </div>
            {isHost && 
            <div>
                <button className='button' onClick={handleClickOut}> Eliminar Sesión de Juego </button>
            </div>}       
        </div>
    )
}