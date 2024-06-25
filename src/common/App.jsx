import { useNavigate } from 'react-router-dom';
import {useContext } from 'react';
import image from '/Cat.png';
import '../styles/App.css';
import { AuthContext } from "../auth/AuthContext";

function App() {
  const navigate = useNavigate();
  const {isUser} = useContext(AuthContext);

  const handleClick = () => {
    if (!isUser) {
      navigate('/login')
    } else {
      navigate('/options')
    }
  }
  
  return (
    <>
      <div className='App'>
        <div className='content'>
          <div className='image-area'>
            <img src={image} alt="cat" className='cat' />
          </div>
          <div className='text-area'>
            <h1>Acerca del Juego</h1>
            <p>
              Este es un juego de carrera por quien llega primero a la meta. El funcionamiento es simple, 4 
              jugadores lanzan un dado por cada turno para llegar a la meta, pero entre ellos hay una 
              bomba, la cual pueden lanzar a los rivales y enviarlos de vuelta al inicio de la carrera.
            </p>

            <div className='button-area'>
              <button className='button' onClick={handleClick}>Jugar Ya!</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
