import StartHighScore from "./StartHighScore.tsx";
import StartLogin from "./StartLogin.tsx";
import React from "react";

interface IProp {
    startGame: (userId: string) => void
}

const StartGame:React.FC<IProp> = ({startGame}) => {

    const getUser = (userId:string) => {
        console.log("User ID: ", userId)
        startGame(userId)
    }

    return(
        <div className="start">
            <h1>Peeps card game</h1>
            <img src="../src/assets/images/character/peep_correct.png" alt="The peep" />
            <div className="start-info-container">
                <div className="left">
                    <h2>Highscore</h2>
                    <StartHighScore />
                </div>
                <div className="right">
                    <h2>About the game</h2>
                    <span>aksdjaksj dkajsdka jskdjakjd kajsdka jsdkaskdj aksjdaksdj kasjdkajskd jaksdjaksjdk ajsdk</span>
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