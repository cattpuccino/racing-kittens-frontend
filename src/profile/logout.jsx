// Código extraído de cápsulas.

import React, {useContext, useState} from 'react';
import '../styles/Rooms.css';
import { AuthContext } from '../auth/AuthContext';

const LogoutButton = () => {
  const {logout} = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const handleLogout = () => {
    logout();
    alert("Has hecho logout con éxito!")
  }

  return (
    <>
        {msg.length > 0 && <div className="successMsg"> {msg} </div>}
        <a onClick={handleLogout}>
        Cerrar sesión
        </a>
    </>
  );
}

export default LogoutButton;