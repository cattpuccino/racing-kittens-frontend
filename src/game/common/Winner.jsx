import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/Modal.css';
import confeti from '/confeti.png';

// Cambiar la condición conectando con la API
export default function Winner({setDataArr, params}) {
    const [modal, setModal] = useState(false);
    const [condition, setCondition] = useState(false);
    const [winner, setWinner] = useState({id: 1, name: 'Pepito'}); 
    const navigate = useNavigate();

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (condition) {
            toggleModal();
        }
    }, [condition, winner]);


    useEffect(() => {
        try{
            // Check if winner
            setCondition(false);
            let body = JSON.parse(params.body);
            console.log(body);
            if (body.message === 'Fin de la partida') {
                let board = JSON.parse(body.board);
                let player = board.players.find(player => player.id === params.playerid);
                setWinner(player);
                console.log(winner) 
                setCondition(true)
            }
            else if (body.game_state === false) {
                setWinner({name: body.winner});
                console.log(body.winner);
                setCondition(true);
                console.log(condition)
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [params]);

    const handleClick = () => {
        navigate('/');
    }

    return (
        < > 
            {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal}
                className="overlay"></div>
                <div className="modal-content">
                    <h2>Jugador {winner.name} ha ganado</h2>
                    <img src={confeti} alt="confeti" className="image" />
                    <button onClick={handleClick}>
                        Cerrar
                    </button>
                </div> 
            </div>)}   
        </>
    )
}