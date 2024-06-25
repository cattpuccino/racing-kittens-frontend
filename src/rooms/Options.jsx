import { useNavigate } from 'react-router-dom';
import '../styles/Options.css'
import logo from '/Logo.png'

export default function Options() {
    const navigate = useNavigate();

    const handleClickCreate = () => {
        navigate('/rooms/create-form');
    }

    const handleClickJoin = () => {
        navigate('/rooms/show');
    }
    return (
        <div className="options">
            <div className="logo">
                <h1>Racing</h1>
                <img src={logo} alt="logo" className='logo-image'/>
                <h1>Kittens</h1>
            </div>
            <div className='container'>
                <button className='button' onClick={handleClickCreate}>Crear sala</button>
                <button className='button' onClick={handleClickJoin}>Unirse a una sala</button>
            </div>
        </div>
    )
}
