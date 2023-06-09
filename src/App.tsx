// Components
import Game from "./components/game/Game.tsx";
import StartGame from "./components/start/StartGame.tsx";

// Import style
import './assets/style/css/style.css'
import {useState} from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

const prodUrl = "/project/peeps-card-game"
//const devUrl = "/"

function App() {

    const [currentUser, setCurrentUser] = useState<string>('')

    const getCurrentUser = (user:string) => {
        setCurrentUser(user)
    }

    return (
        <div>
            <BrowserRouter basename={prodUrl}>
                <Routes>
                    <Route path="/" element={<StartGame getCurrentUser={getCurrentUser}/>} />
                    <Route path="/play" element={<Game user={currentUser}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
