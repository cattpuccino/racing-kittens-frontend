import React, { useState, useEffect } from "react";
import '../../styles/Modal.css';
import Endpoint from '../APIHandler';
import Dice1 from '/Dice/Dice1.png';
import Dice2 from '/Dice/Dice2.png';
import Dice3 from '/Dice/Dice3.png';
import Dice4 from '/Dice/Dice4.png';
import Dice5 from '/Dice/Dice5.png';
import Dice6 from '/Dice/Dice6.png';

// Modificar para que se muestre el resultado del dado
export default function Dice({setDataArr, params}) {
    const [modal, setDice] = useState(false);
    const [DiceImg, setDiceResult] = useState(Dice1);


    const toggleModal = () => {
        setDice(!modal);
    };

    useEffect(() => {
        try{
            if (params.body.action !== undefined){
                if (params.body.action === 'Lanzamiento de dados') {
                    let diceResult = params.body.dice_number;
                    if (diceResult === 1) {
                        setDiceResult(Dice1);
                    }
                    else if (diceResult === 2) {
                        setDiceResult(Dice2);
                    }
                    else if (diceResult === 3) {
                        setDiceResult(Dice3);
                    }
                    else if (diceResult === 4) {
                        setDiceResult(Dice4);
                    }
                    else if (diceResult === 5) {
                        setDiceResult(Dice5);
                    }
                    else if (diceResult === 6) {
                        setDiceResult(Dice6);
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [params.body]);

    return (
        < >
            <button onClick={toggleModal} className='button'>
                Lanzar dado
            </button>
            
            {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal}
                className="overlay"></div>
                <div className="modal-content">
                    <h2>Tirar dado</h2>
                    
                    <a id='throw-dice-button'>
                        <img src={DiceImg} alt="Dice" className="dice" />
                    </a>
                    
                    <Endpoint endpoint="throw_dice" method="PATCH" setDataArr={setDataArr} params={params}/>
                    
                    <button onClick={toggleModal}>
                        Cerrar
                    </button>
                </div> 
            </div>)}   
        </>
    )
}