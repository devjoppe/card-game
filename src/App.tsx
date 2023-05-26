// Components
import Game from "./components/game/Game.tsx";
import StartGame from "./components/start/StartGame.tsx";

// Import style
import './assets/style/css/style.css'
import {useState} from "react";
import {Routes, Route, useNavigate, BrowserRouter} from "react-router-dom";

function App() {

    const [currentUser, setCurrentUser] = useState<string>('')

    const navigate = useNavigate()

    const startGame = (userId:string) => {
        setCurrentUser(userId)
        navigate('/play')
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<StartGame startGame={startGame}/>} />
                    <Route path="/play" element={<Game user={currentUser}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
