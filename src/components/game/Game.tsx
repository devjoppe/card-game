// Components
import GameGrid from "./GameGrid.tsx"
import GameInfo from "./GameInfo.tsx"

// Interface
import {cardPlayed, gameCards} from "../../interface/interfaces.tsx";

// Card data
import data from '../../data/cards.json'

// Modules
import {useEffect, useState} from "react";
import arrayShuffle from "array-shuffle";

const Game = () => {

    const [gameCards, setGameCards] = useState<gameCards[]>([])
    const [checkIsAnswer, setCheckIsAnswer] = useState<cardPlayed[]>([])
    //const [counter, setCounter] = useState<number>(0)

    useEffect(() => {
        // Create new Array with duplicates
        const duplicateCards:gameCards[] = data.flatMap(e=>
            Array(2).fill({card_id: e.card_id, url: e.url, isFlipped: e.isFlipped, complete: e.complete})
        )
        // Set new ID
        const idUpdateCards = duplicateCards.map((card, index) => ({
            ...card,
            id: index + 1
        }))
        // Shuffle the array and Save the array
        setGameCards(arrayShuffle(idUpdateCards))
    }, [])

    const setCheckAnswer = (playedCard:cardPlayed[]) => {
        //console.log("------THIS IS THE ANSWER------->", playedCard)
        setCheckIsAnswer(playedCard)
    }

    return(
        <div className="game-container">
            <GameInfo getAnswer={checkIsAnswer} />
            <GameGrid gameCards={gameCards} setCheckAnswer={setCheckAnswer}/>
        </div>
    )
}

export default Game
