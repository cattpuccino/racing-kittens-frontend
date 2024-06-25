import React, { useEffect, useState } from "react";
import '../../styles/Modal.css';
import explosion from '/explosion.png';

// Cambiar la condición conectando con la API
export default function Explode({setDataArr, params}) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    let condition = false;

    useEffect(() => {
        let body;
        try {
            body = JSON.parse(params.body);
            if (body.message === "Bomb not defused") {
                condition = true;
            }
            else{
                condition = false;
            }
            //console.log(condition, "condition")
            if (condition) {
                toggleModal();
            }
        } catch (error) {
            console.error(error);
        }
    }, [params]);

    return (
        < > 
            {modal && (
            <div className="modal">
                <div 
                onClick={toggleModal}
                className="overlay"></div>
                <div className="modal-content">
                    <h2>Explotaste</h2>
                    
                    <img src={explosion} alt="explosion" className="image" />

                    <h2>Vuelves al inicio</h2>

                    <button onClick={toggleModal}>
                        Cerrar
                    </button>
                </div> 
            </div>)}   
        </>
    )
}