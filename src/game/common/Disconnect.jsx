import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../../styles/Modal.css';

// Cambiar la condición conectando con la API
export default function Disconnect() {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggleModal = () => {
        setModal(!modal);
    };

    const condition = false;

    useEffect(() => {
        if (condition) {
            toggleModal();
        }
    }, [condition]);

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
                <div className="store-content">
                    <h2>Error: Falla en la conexión</h2>
                    <button onClick={handleClick}>
                        Cerrar
                    </button>
                </div> 
            </div>)}   
        </>
    )
}