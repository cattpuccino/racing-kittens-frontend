import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App';
import Instructions from '../pages/Instructions';
import { Navbar } from './Navbar';
import Us from '../pages/Us';
import Login from '../profile/login';
import Signup from '../profile/signup';
import UserCheck from '../protected/UserCheck'; 
import GamePage from '../game/GamePage';
import Options from '../rooms/Options';
import Create from '../rooms/Create';
import Rooms from '../rooms/Rooms';
import Store from '../game/common/Store';
import Waiting from '../rooms/Waiting';
import Dashboard from '../admin/dashboard';



function Routing() {
    return (
        <div>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/instructions" element={<Instructions />}/>
                    <Route path="/us" element={<Us />}/>

                    <Route path={"/signup"} element={<Signup />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/UserCheck" element={<UserCheck />}/>

                    <Route path="/dashboard" element={<Dashboard />}/>

                    <Route path="/game" element={<GamePage />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                    <Route path="/options" element={<Options />}/>
                    <Route path='/rooms/create-form' element={<Create />}/>
                    <Route path='/rooms/show' element={<Rooms />}/>
                    <Route path='/rooms/waiting-room/:roomId' element={<Waiting />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routing;