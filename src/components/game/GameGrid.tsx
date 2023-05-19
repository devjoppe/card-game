import React, {useState} from "react";

// Interface
import {gameCards} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards}) => {

    console.log("Inside GameGrid: ", gameCards)

    const [playedCards, setPlayedCards] = useState<number[]>([])
    const [flippedCard, setFlippedCard] = useState('is-flipped')
    const [count, setCount] = useState(0)

    const flipCard = (id:number) => {
        console.log(id)
    }

    return(
        <div className="grid">
            {gameCards.map((card, id) => (
                <div key={id}>
                    <div className="flip-card" data-card={card.card_id} onClick={() => flipCard(id)} id={`${id}`}>
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