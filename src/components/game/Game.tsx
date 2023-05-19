import arrayShuffle from "array-shuffle";

// Components
import GameGrid from "./GameGrid.tsx"
import GameInfo from "./GameInfo.tsx"

// Interface
import {gameCards} from "../../interface/interfaces.tsx";

// Card data
import data from '../../data/cards.json'
import {useEffect, useState} from "react";

const Game = () => {

    const [gameCards, setGameCards] = useState<gameCards[]>([])

    useEffect(() => {
        // Create new Array with duplicates
        const duplicateCards:gameCards[] = data.flatMap(e=>
            Array(2).fill({card_id: e.card_id, url: e.url})
        )
        console.log("TEST: ", duplicateCards)
        // Shuffle the array
        setGameCards(arrayShuffle(duplicateCards))
    }, [])

    console.log(gameCards)

    return(
        <div>
            <GameInfo />
            <GameGrid gameCards={gameCards}/>
        </div>
    )
}

export default Game
