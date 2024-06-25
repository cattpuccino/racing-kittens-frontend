import '../styles/pages.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import API_URL from '../config';

export default function Dashboard() {
    const { token } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
        
    useEffect(() => {
        axios({
        method: 'get',
        url: `${API_URL}/users`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then((res) => {
            setUsers(res.data);
        })
        .catch((error) => console.error(error));
        
    }, [])
    
    return (
        <div className='dashboard'>
            <h2>Users</h2>
            {users.map(user => (
                <div className='user-info' key={user.id}>
                    <p>Id: {user.id}</p>
                    <p>Nombre: {user.username}</p>
                    <p>Correo: {user.email}</p>
                    <p>Rol: {user.role}</p>
                </div>
                ))}
        </div>
    )
}