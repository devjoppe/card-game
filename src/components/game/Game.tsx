// Components
import GameGrid from "./GameGrid.tsx"
import GameInfo from "./GameInfo.tsx"

// Interface
import {cardPlayed, gameCards} from "../../interface/interfaces.tsx";

// Card data
import data from '../../data/cards.json'

// Modules
import React, {useEffect, useState} from "react";
import arrayShuffle from "array-shuffle";
import {Link, useNavigate} from "react-router-dom";

interface IProp {
    user: string
}

const Game:React.FC<IProp> = ({user}) => {

    // Many of these variables are handling the game loop
    const [gameCards, setGameCards] = useState<gameCards[]>([])
    const [gameUser, setGameUser] = useState<string>('')
    const [userScore, setUserScore] = useState(0)
    const [checkIsAnswer, setCheckIsAnswer] = useState<cardPlayed[]>([])
    const [gameBreak, setGameBreak] = useState<boolean>(false)
    const [isGameComplete, setIsGameComplete] = useState<boolean>(false)    //const [counter, setCounter] = useState<number>(0)
    const [playAgain, setPlayAgain] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setGameBreak(false)
        // Check if there is a user, if not -> stop the game
        if(!user && !gameUser) {
            console.error("NO USER: Game stops")
            setGameBreak(true)
            return
        }

        // If user current user plays first time
        if(!gameUser) {
            setGameUser(user)
        }

        // Reset game loop variables
        if(playAgain) {
            setIsGameComplete(false)
            setUserScore(0)
            console.log("Does it RESET????", playAgain, isGameComplete, userScore)
        }

        setPlayAgain(false)

        // Setting up new play cards
        // Create new Array with duplicates
        const duplicateCards:gameCards[] = data.flatMap(e=>
            Array(2).fill({card_id: e.card_id, url: e.url, isFlipped: e.isFlipped, complete: e.complete})
        )
        // Set new IDs
        const idUpdateCards = duplicateCards.map((card, index) => ({
            ...card,
            id: index + 1
        }))
        // Shuffle the array and Save the array
        setGameCards(arrayShuffle(idUpdateCards))
    }, [user, gameUser, playAgain, isGameComplete, userScore])

    const setCheckAnswer = (playedCard:cardPlayed[]) => {
        setCheckIsAnswer(playedCard)
    }

    const gameComplete = (score:number) => {
        console.log("Game complete", score)
        setUserScore(score)
        setIsGameComplete(true)
    }

    return(
        <div className="game-container">
            {gameBreak && <span>You need to create a user before you can play... duh <Link to={'/'}>Go back</Link></span>}
            {!gameBreak && <>
                <GameInfo getAnswer={checkIsAnswer} user={user} gameComplete={gameComplete} playAgain={playAgain} />
                <GameGrid gameCards={gameCards} setCheckAnswer={setCheckAnswer} playAgain={playAgain}/>
            </>}
            {isGameComplete && <div className="game-complete-container">
                <h2>GAME IS COMPLETE</h2>
                <span className="complete-score">You score is: {userScore}</span>
                <div className="play-again">
                    <button className="play-button" onClick={() => {
                        setPlayAgain(true)
                    }}>Play again</button>
                    <button onClick={() => {navigate('/')}}>Exit game</button>
                </div>
            </div>}
        </div>
    )
}

export default Game
