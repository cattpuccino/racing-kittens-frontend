import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
    const [isUser, setIsUser] = useState('');

    function logout() {
        setToken(null)
        setIsUser(false);
    }

    useEffect(() => {
        // Idea de remover el token y username extraída de chat gpt.
        if(token){
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);
            setIsUser(true);
        } else {
            localStorage.removeItem('token', token);
            localStorage.removeItem('userName', userName);
            setIsUser(false);
        }
    }, [token, userName]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout, isUser, setIsUser, userName, setUserName}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;