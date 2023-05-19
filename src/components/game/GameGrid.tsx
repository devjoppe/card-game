import React from "react";

// Interface
import {gameCards} from "../../interface/interfaces.tsx";

interface gameCardsProps {
    gameCards: gameCards[]
}

const GameGrid:React.FC<gameCardsProps> = ({gameCards}) => {

    console.log("Inside GameGrid: ", gameCards)

    let id = 1;

    return(
        <div className="grid">
            {gameCards.map(card => (
                <div key={id += 1}>
                    <div className="flip-card">
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