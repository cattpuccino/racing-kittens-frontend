import { useEffect , useState, useContext} from "react";
import '../styles/Navbar.css';
import logo from '/Logo.png';
import LogoutButton from '../profile/logout';
import { AuthContext } from "../auth/AuthContext";


// Función extraída de chatGPT, permite decodificar el JWT de manera manual ya que no funcionó el 
// uso de la librería jwt-decode.
function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token");
      return null;
    }
  }

export const Navbar = () =>{
    const { isUser, userName } = useContext(AuthContext);
    const { token } = useContext(AuthContext);
    const [scope, setScope] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        if(token){
            const decodedToken = parseJwt(token);
            const scopes = decodedToken ? decodedToken.scope : null;
            if(scopes){
                const neededScope = scopes.find(scope => scope === 'admin');
                setScope(neededScope);
                if(scope === 'admin'){
                    setIsAdmin(true);
                }
            }
        }
        setMsg(!isUser ? 'No Registrado' : userName);
    }, [isUser, userName]);
    return (
        <div>
            <nav className="nav">
                <a href="/" className="site-title">
                    <img src={logo} alt="Logo" className="nav-logo" />
                    Racing Kittens
                </a>
                {isUser && <p className="user">Bienvenido! {msg}
                </p>}
                <ul>
                    <li>
                        <a href="/us">Nosotros</a>
                    </li>
                    <li>
                        <a href="/instructions">Como Jugar</a>
                    </li>
                    <li>
                        {isUser && <LogoutButton></LogoutButton>}
                        {!isUser && <a href="/login">Iniciar Sesión</a>}
                    </li>
                    <li>
                        {isAdmin && <a href="/dashboard">Dashboard</a>}
                    </li>
                </ul>

            </nav>
        </div>
    )
}
