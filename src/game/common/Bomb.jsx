import React, { useState, useEffect } from "react";
import '../../styles/Modal.css';
import player1Icon from '/Player1.png';
import player2Icon from '/Player2.png';
import player3Icon from '/Player3.png';
import player4Icon from '/Player4.png';
import Endpoint from '../APIHandler';


// Ejemplo si Jugador 1 lanza la bomba
export default function Bomb({setDataArr, params}) {
    const [modal, setBomb] = useState(false);
    const [users, setUsers] = useState([
        { id: 1, name: 'Jugador 1', color: 'red', icon: player1Icon },
        { id: 2, name: 'Jugador 2', color: 'blue', icon: player2Icon },
        { id: 3, name: 'Jugador 3', color: 'green', icon: player3Icon },
        { id: 4, name: 'Jugador 4', color: 'yellow', icon: player4Icon }
    ]);

    const toggleModal = () => {
        setBomb(!modal);
    };

    useEffect(() => {
        try {
            users.forEach((user) => {
                if (user.id === params.playerNumber) {
                    setUsers(users.filter((user) => user.id !== params.playerNumber));
                }
            })
        }
        catch (error) {
            console.error(error);
        }
    }, [params.playerid]);
    

    return (
        <> 
            <button onClick={toggleModal} className='button'>
                Lanzar bomba
            </button>
            
            {modal && (
                <div className="modal">
                    <div 
                        onClick={toggleModal}
                        className="overlay"
                    ></div>
                    <div className="modal-content">
                        <h2>Elige un jugador para tirarle la bomba</h2>   
                        <div className="players">
                            {users.map((user) => (
                                <div key={user.id} className="player">
                                    <div className="players-choice">
                                        <div 
                                            className='player-icon' 
                                            style={{
                                                outlineStyle: 'solid', 
                                                outlineColor: user.color, 
                                                outlineWidth: '3px'
                                            }}
                                        >
                                            <img 
                                                src={user.icon} 
                                                alt={`player-icon-${user.id}`} 
                                                className='icon'
                                            />  
                                        </div>
                                        <h3>{user.name}</h3>
                                    </div>
                                    <Endpoint endpoint="throw_bomb" method="PATCH" setDataArr={[...setDataArr, setBomb]} params={
                                        (() => {
                                            //console.log(params.target_id)
                                            return {target_id: user.id, ...params}
                                        })()
                                    } />
                                </div>
                            ))}
                        </div>
                        <button 
                            className='close-modal' 
                            onClick={toggleModal}
                        >
                            Cerrar
                        </button>
                    </div> 
                </div>
            )}   
        </>
    );
}
