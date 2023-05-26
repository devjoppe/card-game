import StartHighScore from "./StartHighScore.tsx";
import StartLogin from "./StartLogin.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";

interface IProp {
    getCurrentUser: (user:string) => void
}

const StartGame:React.FC<IProp> = ({getCurrentUser}) => {

    const navigate = useNavigate()

    const startGame = () => {
        navigate('/play')
    }

    const getUser = (userId:string) => {
        getCurrentUser(userId)
        startGame()
    }

    return(
        <div className="start">
            <h1>Peeps card game</h1>
            <img src="./images/character/peep_correct.png" alt="The peep" />
            <div className="start-info-container">
                <div className="left">
                    <h2>Highscore</h2>
                    <StartHighScore />
                </div>
                <div className="right">
                    <h2>About the game</h2>
                    <span>The game consists of a set of cards, each with a matching pair. The objective is to find all the matching pairs by flipping over two cards at a time.</span>
                    <span>Visit: <a href="https://www.openpeeps.com/" target="_blank">https://www.openpeeps.com/</a>for awesome illustrations.</span>
                    <div className="start-game">
                        <h2>Play</h2>
                        <StartLogin getUser={getUser}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartGame