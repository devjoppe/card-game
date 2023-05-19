import React, {useState} from "react";

// Interface
import {gameCards} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards}) => {

    console.log("Inside GameGrid: ", gameCards)

    const [isFlipped, setIsFlipped] = useState(false)
    const [playCards, setPlayCards] = useState<gameCards[]>(gameCards)

    const flipCard = (e:any) => {
        console.log("Flipping", e.currentTarget)
        e.currentTarget.classList.add('flipped')
    }

    return(
        <div className="grid">
            {gameCards.map((card, id) => (
                <div key={id}>
                    <div className="flip-card" onClick={flipCard} id={`${id}`}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src="../src/assets/images/card-front.png" alt="gamecard" />
                            </div>
                            <div className="flip-card-back">
                                <img src={`../src/assets/images/cards/${card.url}`} alt="gamecard" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GameGrid