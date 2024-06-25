import React, { useEffect, useState } from "react";
import '../../styles/Modal.css';
import Endpoint from '../APIHandler';

// Lista ejemplo para que funcione la tienda (modificar en backend?)
let placeholderItems = [
        {
            name: "Avanzar una casilla más por lanzamiento de dado",
            cost: 8
        },
        {
            name: "Reducción en compras de desactivación y bomba",
            cost: 8
        },
        {
            name: "Aumenta los turnos que puede mantener la bomba sin que explote",
            cost: 8
        },
        {
            name: "Aumenta la cantidad de monedas que recibe al final del turno",
            cost: 8
        },
        {
            name: "Desactivacion",
            cost: 12
        }
];

// Cambiar la condición active al conectarla con la API
export default function Store({setDataArr, params}) {
    const [modal, setStore] = useState(false);
    const [active, setActive] = useState(false);
    const [items, setItems] = useState(placeholderItems);
    const toggleModal = () => {
        setStore(!modal);
    };

    function checkStore(pos, specialCells){
        for (let i = 0; i < specialCells.length; i++){
            if (pos === specialCells[i].position && specialCells[i].type === "store"){
                return true;
            }
        }
        return false;
    }
    useEffect(() => {
        try {
            let body = JSON.parse(params.body);
            let check = false;
            if (body.board !== undefined && body.board.players !== undefined && body.board.specialCells !== undefined){
                let pos = body.board.players.find(player => player.id === params.playerid).position;
                let specialCells = body.board.specialCells;
                check = checkStore(pos, specialCells);
            }
            if (check && body.message === "El jugador avanza y puede comprar" && body.options.options !== undefined){
                setActive(true);
                let options = body.options.options;
                setItems(options);
            }
            else if (check){
                setActive(true);
            }
            else {
                setActive(false);
                setItems(placeholderItems);
            }        
        }
        catch (error) {
            console.error(error);
        }
      }, [params])

    
    return (
        < >
            <button onClick={toggleModal} className='button' disabled={!active}>
                Abrir tienda
            </button>

            {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal}
                className="overlay"></div>
                <div className="store-content">
                    <h2>Tienda</h2>
                    {items.map((item, index) => (
                        <div key={index} className="item">
                            <p>{item.name} - {item.cost} monedas</p>
                            <Endpoint endpoint="store" method="PATCH" setDataArr={setDataArr} params={
                                (() => {
                                    return {selectedOption: item.name, ...params}
                                })()
                            }/>
                        </div>
                    ))}
                    <button onClick={toggleModal}>
                        Cerrar
                    </button>
                </div> 
            </div>)}   
        </>
    )
}