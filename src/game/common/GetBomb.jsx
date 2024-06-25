import React, { useEffect, useState } from "react";
import '../../styles/Modal.css';
import bomb from '/bomba.png';
import Endpoint from '../APIHandler';

// Cambiar la condición conectando con la API
// Y cambiar el onClick de no desactivar para que se active Explode.jsx
export default function GetBomb({setDataArr, params}) {
    const [modal, setModal] = useState(false);
    const [condition, setCondition] = useState(false);
    const [playerWithBomb, setPlayerWithBomb] = useState([0, false]);

    useEffect(() => {
        try{
            if (condition && playerWithBomb[0] === params.playerid){
                setModal(true);
                console.log("Showing modal", playerWithBomb[0], params.playerid)
            }
        }
        catch (error) {
            console.error(error);
        }
    }, [condition])

    useEffect(() => {
        try{
            setModal(false);
            let body = JSON.parse(params.body);
            if (body.explotedPlayer !== undefined){
                let exploded = body.explotedPlayer;
                setPlayerWithBomb([exploded.id, exploded.state]);
                console.log("Player with bomb: ", playerWithBomb, "state: ", exploded.state)
            }
            if (playerWithBomb[1]){
                setCondition(true);
            }
            //console.log(condition, "condition", playerWithBomb[0], params.playerid)
        }
        catch (error) {
            console.error(error);
        }
    }, [params]);

    return (
        < > 
            {modal && (
            <div className="modal">
                <div 
                className="overlay"></div>
                <div className="modal-content">
                    <h2>Bomba va a explotar!</h2>
                    
                    <img src={bomb} alt="bomb" className="image" />

                    <div className="button-area">
                        <Endpoint endpoint="defuse_bomb" method="PATCH" setDataArr={[...setDataArr, setModal]} params={
                            (() => {
                                return {playerWithBomb: playerWithBomb[0], ...params}
                            })()
                        } />
                    </div>
                </div> 
            </div>)}   
        </>
    )
}